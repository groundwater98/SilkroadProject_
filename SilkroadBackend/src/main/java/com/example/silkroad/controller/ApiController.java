package com.example.silkroad.controller;

import com.example.silkroad.dto.OutlookRequest;
import com.example.silkroad.dto.OutlookResponse;
import com.example.silkroad.dto.RoadMapRequest;
import com.example.silkroad.dto.RoadMapResponse;
import com.example.silkroad.service.OutlookService;
import com.example.silkroad.service.RoadMapService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ApiController {
    private final RoadMapService roadMapService;
    private final OutlookService outlookService;
    @GetMapping("/occupation")
    public RoadMapResponse occupation(@Valid @ModelAttribute RoadMapRequest request) {
//        String id= URLEncoder.encode(request.getOccupation(), "UTF-8")
        출처: https://liante0904.tistory.com/65 [Liante의 이야기:티스토리]
        return roadMapService.convertStringToRoadMap(roadMapService.GenerateRoadMapFromPython(request));
    }

    @GetMapping("/outlook")
    public OutlookResponse outlook(@Valid @ModelAttribute OutlookRequest request){
        return outlookService.convertStringToOutlook(outlookService.GenerateOutlookFromPython(request));
    }
}
