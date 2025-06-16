import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentsRepository } from '../../infrastructure/comments.repository';
import { PostsRepository } from 'src/modules/bloggers-platform/posts/infrastructure/posts.repository';
import { UsersExternalService } from 'src/modules/user-accounts/application/users.external-service';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentModelType } from '../../domain/comment.entity';

export class CreateCommentCommand {
  constructor(
    public postId: string,
    public userId: string,
    public content: string,
  ) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand, string>
{
  constructor(
    @InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersService: UsersExternalService,
  ) {}

  async execute(command: CreateCommentCommand): Promise<string> {
    await this.postsRepository.findOrNotFoundFail(command.postId);
    const user = await this.usersService.findUserById(command.userId);
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'User not found',
      });
    }
    const newComment = this.CommentModel.createComment({
      content: command.content,
      postId: command.postId,
      userId: command.userId,
      userLogin: user.login,
    });
    const commentId = await this.commentsRepository.save(newComment);
    return commentId;
  }
}
