package com.example.silkroad.service;

import com.example.silkroad.dto.RoadMapRequest;
import com.example.silkroad.dto.RoadMapResponse;
import com.example.silkroad.exception.ErrorCode;
import com.example.silkroad.exception.NoExistOccupationException;
import com.example.silkroad.exception.UserErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service

public class RoadMapService {

    public RoadMapService() throws IOException {
    }

    public String GenerateRoadMapFromPython(RoadMapRequest request){
        System.out.println(request);
        URI uri = UriComponentsBuilder
                .fromUriString("http://host.docker.internal:8080")
                .path("api/occupation")
                .build()
                .toUri();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(uri, request, String.class);
        if(Objects.equals(response.getBody(), "없음")){
            throw new NoExistOccupationException(UserErrorCode.NOT_EXIST_OCCUPATION);
        }
        return response.getBody();
    }

    public RoadMapResponse convertStringToRoadMap(String roadMap){
        List<String> lines = new ArrayList<>();
        String section = "";
        Status status = Status.Section;

        lines = Arrays.stream(roadMap.replace("\\n", "&").split("&")).filter(s->!s.isBlank()).toList();
        RoadMapResponse roadMapResponse = new RoadMapResponse();
        roadMapResponse.setOccupation(lines.get(0));

        roadMapResponse.setTitle(lines.get(1).replace("**", ""));

        for(int i = 2; i < lines.size(); i++){
            String str = lines.get(i);
            if(str.startsWith("**") || str.startsWith("--") || str.startsWith("##")) {
                str = str.replace("**", "");
                str = str.strip();
                if (str.contains("개월") || str.contains("월")) {
                    status = Status.Section;
                    section = str;
                }else if(str.contains("추천") || str.contains("권장")){
                    status = Status.Additional;
                }else{
                    status = Status.Tip;
                }
            } else if(str.startsWith("*") || str.startsWith("-") || str.startsWith("#")){
                str = str.replace("*", "");
                str = str.strip();
                switch (status){
                    case Section -> roadMapResponse.addContentBySection(section, str);
                    case Additional -> roadMapResponse.addAdditionalDataBySection(section, str);
                    case Tip -> roadMapResponse.addTip(str);

                }
            }
        }
        return roadMapResponse;
    }

    public enum Status{
        Section, Additional, Tip
    }
}


