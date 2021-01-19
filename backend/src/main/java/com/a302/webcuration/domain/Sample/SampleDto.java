package com.a302.webcuration.domain.Sample;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotNull;

public class SampleDto {

    private final ModelMapper modelMapper;

    public SampleDto(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Getter @Setter @Builder
    public static class RegSampleRequest {

        @NotNull
        private String userName;
        @NotNull
        private int userAge;

        public Sample toEntity()
        {
            return Sample.builder()
                   .userName(this.userName)
                    .userAge(this.userAge)
                    .build();
        }
    }

}
