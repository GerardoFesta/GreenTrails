package it.greentrails.backend.gestioneUtenze.security;

import it.greentrails.backend.enums.RuoloUtente;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


//TODO: sistemare configurazione Spring Security
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.BASIC_AUTH_ORDER - 10)
public class SecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests((authorize) -> authorize
            .requestMatchers(HttpMethod.PUT, "/api/utenti").permitAll()
            .requestMatchers("/api/utenti/**").authenticated()
            .requestMatchers(HttpMethod.POST, "/api/file").authenticated()
            .requestMatchers(HttpMethod.GET, "/api/file/").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/attivita/*").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/attivita").hasRole(RuoloUtente.GESTORE_ATTIVITA.name())
            .requestMatchers(HttpMethod.GET, "/api/camere/**")
            .hasRole(RuoloUtente.VISITATORE.name())
            .requestMatchers("/api/camere")
            .hasRole(RuoloUtente.GESTORE_ATTIVITA.name())
            .anyRequest().authenticated()
        )
        .httpBasic(Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable);

    return http.build();
  }

}
