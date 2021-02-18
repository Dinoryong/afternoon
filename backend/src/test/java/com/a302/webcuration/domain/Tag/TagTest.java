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
        String tagTitle = "개발자";
        Tag tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //개발자
        tagTitle = "스키";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //디자이너
        tagTitle = "카페";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //요리사
        tagTitle = "헬스";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //밴드
        tagTitle = "캠핑";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

        //Given
        //인테리어
        tagTitle = "의료";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //드레스룸
        tagTitle = "메이크업";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //서재
        tagTitle = "클라이밍";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //와인룸
        tagTitle = "테니스";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //아기방
        tagTitle = "요리";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //고양이방
        tagTitle = "카메라";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //컬렉션
        tagTitle = "서재";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //피규어
        tagTitle = "게임";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //레고
        tagTitle = "스킨스쿠버";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);
        //신발
        tagTitle = "악기";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

        //굿즈
        tagTitle = "고양이방";
        tag= Tag.builder()
                .tagTitle(tagTitle)
                .build();
        tagRepository.save(tag);

    }
}