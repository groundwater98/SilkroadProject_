package com.example.silkroad.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@RequiredArgsConstructor
public class OutlookRequest {
    @NotBlank(message = "직업을 입력해주세요")
    @Size(max = 15, message = "직업 명이 너무 길어요")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-zA-Z\s]+$", message = "직업명을 정확히 입력해주세요")
    final String occupation;
}
