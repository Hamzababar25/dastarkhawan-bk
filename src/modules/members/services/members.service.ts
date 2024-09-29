import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entites/members.entity';
import { CreateMemberDto } from '../dtos/createmember.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(memberData: CreateMemberDto): Promise<Member> {
    const newMember = this.memberRepository.create(memberData);

    // Ensure all required fields are filled out
    if (!newMember.fullname || !newMember.mail) {
      throw new Error('Missing required fields: fullname or mail');
    }

    return this.memberRepository.save(newMember);
  }
}