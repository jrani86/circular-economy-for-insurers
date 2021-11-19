package com.ey.esg.controller;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@RestController
@CrossOrigin(origins = "*")
@ComponentScan
public class GeoController {
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("Access-Control-Allow-Origin");
        corsConfiguration.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.HEAD.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name()));
        corsConfiguration.setMaxAge(1800L);
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addExposedHeader("header1");
        corsConfiguration.addExposedHeader("header2");
        source.registerCorsConfiguration("/**", corsConfiguration); // you restrict your path here
        return source;
    }
	
	@Bean
	public RestTemplate restTemplate() {
	    return new RestTemplate();
	}
	
	@Autowired
    protected RestTemplate restTemplate;
	
	@GetMapping(path = "/hello-world/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		//throw new RuntimeException("Something went wrong");
		return new HelloWorldBean(String.format("Hello World, %s", name));
	}
	
	@GetMapping(path = "/geomaplocation/{param}")
	public String fetchGeoLocation(@PathVariable String param) {
		return restTemplate.getForObject("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?category=Repair Services&outFields=PlaceName,Place_Addr,City,Region&maxLocations=5&location=" + param+
				"&forStorage=false&f=pjson&token=AAPK9e36f024eaaa463987896d3bf7badce6CAbz3Ez3VNkwfB5-KF1saZEOhu9dX-fTdXvKoRkSxLLSOg9-odaM-SKrkQP9AAjX"
                , String.class);
	}

	@GetMapping(path = "/geomap/{addressParam}")
	public String fetchCoordinates(@PathVariable String addressParam) {
		return restTemplate.getForObject("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressParam+"&forStorage=false&f=pjson"
				+ "&key=AIzaSyDNKPmO2UKtZ8KklnS7ewEBgQpqmnE0PT0"
	                , String.class);
	}
	
	
	
}