package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.service.SearchService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/search")
@RequiredArgsConstructor
@Api
public class SearchController {
    private final SearchService searchService;
    //유저는 닉네임 태그 태그이름
    @GetMapping("/{name}")
    public ResponseEntity search(@PathVariable String name, @RequestHeader(value = "Authorization") String token){
        BaseMessage bm =searchService.search(name);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }
}
