package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.service.SearchService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/search")
@RequiredArgsConstructor
@Api
public class SearchController {
    private final SearchService searchService;
    //유저는 닉네임 태그 태그이름
    // TODO: 2021-02-04 태그 기준 검색 태그에 등록된 게시물 수
    @GetMapping("/{name}")
    public ResponseEntity search(@PathVariable String name){
        BaseMessage bm =searchService.search(name);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }
}
