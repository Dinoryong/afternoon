package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.common.BaseDomainTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;

import static org.junit.Assert.*;

public class TagTest extends BaseDomainTest {
    @Autowired
    TagRepository tagRepository;

    @Test
    public void 태그_생성(){
        //Given
        //작업공간
        String tagTitle = "작업공간";
        Tag tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //개발자
        tagTitle = "개발자";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //디자이너
        tagTitle = "디자이너";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //요리사
        tagTitle = "요리사";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //밴드
        tagTitle = "밴드";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

        //Given
        //인테리어
        tagTitle = "인테리어";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //드레스룸
        tagTitle = "드레스룸";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //서재
        tagTitle = "서재";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //와인룸
        tagTitle = "와인룸";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //아기방
        tagTitle = "아기방";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //고양이방
        tagTitle = "고양이방";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //컬렉션
        tagTitle = "컬렉션";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //피규어
        tagTitle = "피규어";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //레고
        tagTitle = "레고";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //신발
        tagTitle = "신발";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

        //굿즈
        tagTitle = "굿즈";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

        //Given
        //레져스포츠
        tagTitle = "레져스포츠";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //테니스
        tagTitle = "테니스";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //스킨스쿠버
        tagTitle = "스킨스쿠버";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //캠핑
        tagTitle = "캠핑";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //클라이밍
        tagTitle = "클라이밍";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //헬스
        tagTitle = "헬스";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //필라테스
        tagTitle = "필라테스";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

    }
}