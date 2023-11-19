package com.example.silkroad.service;

import com.example.silkroad.dto.OutlookRequest;
import com.example.silkroad.dto.OutlookResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OutlookService {
    public String GenerateOutlookFromPython(OutlookRequest request){
        System.out.println(request);

        URI uri = UriComponentsBuilder
                .fromUriString("http://host.docker.internal:8080")
                .path("/api/outlook")
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(uri, request, String.class);
        return response.getBody();
    }

    public OutlookResponse convertStringToOutlook(String outlook){
        Status status = null;
        List<String> lines = new ArrayList<>();
        lines = Arrays.stream(outlook.replace("\\n", "&").split("&")).filter(s->!s.isBlank()).toList();
        OutlookResponse outlookResponse = new OutlookResponse();
        outlookResponse.setOccupation(lines.get(0));
        outlookResponse.setTitle(lines.get(1).replace("*", ""));
        for(int i = 2; i < lines.size(); i++){
            String str = lines.get(i);
            if(str.startsWith("**") || str.startsWith("--") || str.startsWith("##")){
                str = str.replace("*", "");
                str = str.strip();
                if(str.contains("긍정"))
                    status = Status.POSITIVE;
                else if(str.contains("부정"))
                    status = Status.NEGATIVE;
                else if(str.contains("조언") | str.contains("팁") || str.contains("고려"))
                    status = Status.CONSIDER;
                else if(str.contains("전문")) {
                    status = Status.EXPORT;
                }
            }
            else if(str.startsWith("*") || str.startsWith("-") || str.startsWith("#")){
                int idx = str.lastIndexOf("**");
                String key = str.substring(0, idx).replace("*", "").strip();
                String value = str.substring(idx).replace("*", "").strip();
                switch (status){
                    case POSITIVE -> outlookResponse.getPositive().put(key, value);
                    case NEGATIVE -> outlookResponse.getNegative().put(key, value);
                    case CONSIDER -> outlookResponse.getAdditionalConsider().put(key, value);
                    case EXPORT -> outlookResponse.getViewOfExpert().put(key, value);
                }

            }
            else{
                outlookResponse.getResult().add(str.replace("*", "").strip());
            }
        }
        System.out.println(outlookResponse.getPositive());
        System.out.println(outlookResponse.getNegative());
        System.out.println(outlookResponse.getAdditionalConsider());
        System.out.println(outlookResponse.getViewOfExpert());
        System.out.println(outlookResponse.getViewOfExpert());
        return outlookResponse;
    }

    enum Status{
        POSITIVE, NEGATIVE, CONSIDER, EXPORT
    }
}
