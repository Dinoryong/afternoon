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
//@ActiveProfiles("test")
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
        String email = "12312";

        Sample sample = Sample.builder()
                .userName(name)
                .userAge(age)
                .userEmail(email)
                .build();

        sampleRepository.save(sample);

        String name1 = "park1";
        int age1 = 11;
        String email1 = "12312";

        Sample sample1 = Sample.builder()
                .userName(name1)
                .userAge(age1)
                .userEmail(email1)
                .build();

        sampleRepository.save(sample1);

        String name2 = "Lee1";
        int age2 = 11;
        String email2 = "12312";

        Sample sample2 = Sample.builder()
                .userName(name2)
                .userAge(age2)
                .userEmail(email2)
                .build();

        sampleRepository.save(sample2);
    }


}