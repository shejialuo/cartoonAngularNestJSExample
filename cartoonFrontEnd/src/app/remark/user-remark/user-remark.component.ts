import { Component, OnInit } from '@angular/core';
import { RemarkService } from '../remark.service';
import { Remark } from './user-remark';

@Component({
  selector: 'app-user-remark',
  templateUrl: './user-remark.component.html',
  styleUrls: ['./user-remark.component.css']
})
export class UserRemarkComponent implements OnInit {
  mymessage1 = [
    `他们曾以为他们之间是互相了解的，以为他们能够永远到一起。`,
    `时间和空间却是残酷的，他不知她的生活，她不知道他的世界。`,
    `他逐渐有了她，她逐渐有了他。`,
    `他沉浸在过去的回忆中，她却斩断了过去。`,
  ];
  mymessage2 = [
    `回忆总是美好的，他用工作麻痹自己。`,
    `可怜又可恨，他无法向前进。`,
    `秒速五厘米下落的樱花从不给他片刻的喘息。`,
    `所爱隔山海，山海就是不可平！`,
  ];

  remarks: Remark[] = [];

  constructor(private service: RemarkService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe((remark) => {
      this.remarks = remark;
    })
  }

  addRemark(remark: string) {
    this.service.addOne(remark).subscribe();
    this.service.findAll().subscribe((remark) => {
      this.remarks = remark;
    })
  }

}
