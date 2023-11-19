package com.example.silkroad.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@RequiredArgsConstructor
public class RoadMapResponse {
    private String occupation;
    private String title;
    private Map<String, List<String>> content = new HashMap<>();
    private Map<String, List<String>> additionalData = new HashMap<>();
    private List<String> tip = new ArrayList<>();


    public void addContentBySection(String section, String data){
        content.computeIfAbsent(section, k -> new ArrayList<>()).add(data);
    }

    public void addAdditionalDataBySection(String section, String data){
        additionalData.computeIfAbsent(section, k -> new ArrayList<>()).add(data);
    }

    public void addTip(String data){
        tip.add(data);
    }
}
