package com.twigcodes.demoa;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@FeignClient("demob")
interface DemoBClient {

  @GetMapping("/hello")
  String Hello();
}

/**
 * Application
 */
@RestController
@EnableDiscoveryClient
@EnableFeignClients
@EnableCircuitBreaker
@RefreshScope
@SpringBootApplication
public class Application {

  @Autowired
  private DemoBClient demoBClient;

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @GetMapping("/hello")
  public String Hello() {

    return "I am demo A";
  }

  @HystrixCommand(fallbackMethod = "fallback")
  @GetMapping("/hellob")
  public String HelloB() {
    return demoBClient.Hello();
  }

  public String fallback() {
    return "no data available";
  }
}