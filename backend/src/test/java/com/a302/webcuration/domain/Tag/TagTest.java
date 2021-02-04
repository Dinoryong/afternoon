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
        String tagDesc = "작업공간입니다";
        Tag tag1= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag1);
        //작업공간-개발자
        tagTitle = "개발자";
        tagDesc = "개발자 작업공간입니다";
        Tag tag2= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag2);
        //작업공간-요리사
        tagTitle = "요리사";
        tagDesc = "요리사 작업공간입니다";
        Tag tag3= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag3);
        //작업공간-디자이너
        tagTitle = "디자이너";
        tagDesc = "디자이너 작업공간입니다";
        Tag tag4= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag4);

        //Given
        //인테리어
        tagTitle = "인테리어";
        tagDesc = "인테리어입니다";
        Tag tag5= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag5);
        //인테리어-화장실
        tagTitle = "화장실";
        tagDesc = "화장실 인테리어입니다";
        Tag tag6= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag6);
        //인테리어-서재
        tagTitle = "서재";
        tagDesc = "서재 인테리어입니다";
        Tag tag7= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag7);
        //인테리어-테라스
        tagTitle = "테라스";
        tagDesc = "테라스 인테리어입니다";
        Tag tag8= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag8);

        //Given
        //레저스포츠
        tagTitle = "레저스포츠";
        tagDesc = "레저스포츠입니다";
        Tag tag9= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag9);
        //레저스포츠-캠핑도구
        tagTitle = "캠핑도구";
        tagDesc = "캠핑도구 레저스포츠입니다";
        Tag tag10= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag10);
        //레저스포츠-스키
        tagTitle = "스키";
        tagDesc = "스키 레저스포츠입니다";
        Tag tag11= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag11);
        //레저스포츠-스킨스쿠버
        tagTitle = "스킨스쿠버";
        tagDesc = "스킨스쿠버 레저스포츠입니다";
        Tag tag12= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag12);

        //Given
        //컬렉션
        tagTitle = "컬렉션";
        tagDesc = "컬렉션입니다";
        Tag tag13= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag13);
        //컬렉션-신발
        tagTitle = "신발";
        tagDesc = "신발 컬렉션입니다";
        Tag tag14= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag14);
        //컬렉션-피규어
        tagTitle = "피규어";
        tagDesc = "피규어 컬렉션입니다";
        Tag tag15= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag15);
        //컬렉션-굿즈
        tagTitle = "굿즈";
        tagDesc = "굿즈 컬렉션입니다";
        Tag tag16= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tagRepository.save(tag16);
    }
    @Test
    @Transactional
    public void 부모태그_조회(){
        String tagTitle = "작업공간";
        Tag tag1 = tagRepository.findByTagTitle(tagTitle);
        System.out.println("tag1 = " + tag1.getTagDesc());
    }
}