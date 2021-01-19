package com.a302.webcuration.domain.Sample;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;


@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class SampleTest {

    @Autowired
    SampleRepository sampleRepository;

//    @After
//    public void 초기화()
//    {
//        sampleRepository.deleteAll();
//    }

    @Test
    public void sample_생성()
    {
        //Given
        String name = "choi1";
        int age = 11;

        Sample sample = Sample.builder()
                .userName(name)
                .userAge(age)
                .build();

        sampleRepository.save(sample);
    }


}