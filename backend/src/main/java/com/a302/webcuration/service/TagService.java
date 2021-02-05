package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagDto;
import com.a302.webcuration.domain.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;
    @Transactional
    public BaseMessage retrieveTagAll(){
        List<Tag> tags=tagRepository.findAll();
        List<TagDto.Tag> tagList=tags.stream().map(tag->modelMapper.map(tag,TagDto.Tag.class)).collect(Collectors.toList());
        return new BaseMessage(HttpStatus.OK,tagList);
    }
}
