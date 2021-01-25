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
        //Given
        //작업공간-개발자
        tagTitle = "개발자";
        tagDesc = "개발자 작업공간입니다";
        Tag tag2= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tag2.setParent(tag1);
        tagRepository.save(tag2);
        //Given
        //작업공간-요리사
        tagTitle = "요리사";
        tagDesc = "요리사 작업공간입니다";
        Tag tag3= Tag.builder()
                .tagTitle(tagTitle)
                .tagDesc(tagDesc)
                .build();
        tag3.setParent(tag1);
        tagRepository.save(tag3);

    }
    @Test
    @Transactional
    public void 부모태그_조회(){
        String tagTitle = "작업공간";
        Tag tag1 = tagRepository.findByTagTitle(tagTitle);
        System.out.println("tag1 = " + tag1.getTagDesc());
        //에러뜬거 Transactional 어노테이션으로 해결
        // (영속성 컨텍스트가 종료되어 지연 로딩을 할 수 없어서 발생하는 오류)
        System.out.println("size = "+tag1.getChild().size());
        // TODO: 2021-01-25  상위태그 조회시 하위태그까지 전부 찾기
        //부모태그면 자식태그까지 다 조회
        if(!tag1.getChild().isEmpty()){
            for(Tag childTag : tag1.getChild()){
                System.out.println("childTag = " + childTag.getTagTitle());
            }
        }
    }
}