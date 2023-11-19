package com.example.silkroad.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.*;

@Data
@RequiredArgsConstructor
public class OutlookResponse {
    private String occupation;
    private String title;
    private Map<String, String> positive = new HashMap<>();
    private Map<String, String> negative = new HashMap<>();
    private Map<String, String> additionalConsider = new HashMap<>();
    private Map<String, String> viewOfExpert = new HashMap<>();
    private List<String> result = new ArrayList<>();
}
