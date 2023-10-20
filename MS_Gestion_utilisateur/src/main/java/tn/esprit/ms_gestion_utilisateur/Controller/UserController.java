package tn.esprit.ms_gestion_utilisateur.Controller;


import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;

import tn.esprit.ms_gestion_utilisateur.Dto.LoginDto;
import tn.esprit.ms_gestion_utilisateur.Dto.SignUpDto;
import tn.esprit.ms_gestion_utilisateur.Entity.ERole;
import tn.esprit.ms_gestion_utilisateur.Entity.JwtResponse;
import tn.esprit.ms_gestion_utilisateur.Entity.Role;
import tn.esprit.ms_gestion_utilisateur.Entity.User;
import tn.esprit.ms_gestion_utilisateur.Repository.RoleRepository;
import tn.esprit.ms_gestion_utilisateur.Repository.UserRepository;
import tn.esprit.ms_gestion_utilisateur.SecurityConfig.JwtUtils;
import tn.esprit.ms_gestion_utilisateur.SecurityConfig.TokenService;
import tn.esprit.ms_gestion_utilisateur.Services.UserDetailsImpl;
import tn.esprit.ms_gestion_utilisateur.Services.UserService;

import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtUtils;

    private TokenService tokenService;

    private Map<String, Integer> sessionCountMap = new HashMap<>();



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto request) {

            Optional<User> user = userRepository.findUserByUsername(request.getUsername());

            if (!user.isPresent() || !passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            return ResponseEntity.ok("Login successful");

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){
        // checking for username exists in a database
        if(userRepository.existsByUsername(signUpDto.getUsername())){
            return new ResponseEntity<>("Username is already exist!", HttpStatus.BAD_REQUEST);
        }
        // checking for email exists in a database
        if(userRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Email is already exist!", HttpStatus.BAD_REQUEST);
        }
        // creating user object
        User user = new User();
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        Role roles = roleRepository.findByName(ERole.ADMIN).get();
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
        return new ResponseEntity<>("User is registered successfully!", HttpStatus.OK);
    }

    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/AddClient")
    public ResponseEntity<?> registerClient(@Valid @RequestBody SignUpDto userRequest){
        // checking for username exists in a database
        if(userRepository.existsByUsername(userRequest.getUsername())){
            return new ResponseEntity<>("Username is already exist!", HttpStatus.BAD_REQUEST);
        }
        // checking for email exists in a database
        if(userRepository.existsByEmail(userRequest.getEmail())){
            return new ResponseEntity<>("Email is already exist!", HttpStatus.BAD_REQUEST);
        }
        // creating user object
        User user = new User();
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        Role roles = roleRepository.findByName(ERole.CLIENT).get();
        user.setRoles(Collections.singleton(roles));
        userRepository.save(user);
        return new ResponseEntity<>("Client is registered successfully!", HttpStatus.OK);
    }

    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable("userId") Integer userId) {
        return  new ResponseEntity<>(userService.getUserById(userId),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/remove/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<String> removeUser(@PathVariable("userId") Integer userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>("User deleted succesully", HttpStatus.OK);    }

    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/getAllClient")
    public ResponseEntity<?> findUsersByClientRole() {
        return new ResponseEntity<>(userService.findUsersByRoleClient(),HttpStatus.OK);
    }

    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/getAllAdmin")
    public ResponseEntity<?> findUsersByAdminRole() {
        return new ResponseEntity<>(userService.findUsersByRoleAdmin(),HttpStatus.OK);
    }

  //@PreAuthorize("hasAnyAuthority('ADMIN', 'CLIENT')")
  @PutMapping("/update/{userId}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<User> updateUserInit(@PathVariable Integer userId, @RequestBody User userRequest) {
      try {
          User updatedUser = updateUser(userId, userRequest);
          return ResponseEntity.ok(updatedUser);
      } catch (IllegalArgumentException e) {
          return ResponseEntity.notFound().build();
      }
  }

    @CrossOrigin(origins = "http://localhost:4200")
    public User updateUser(Integer userId, User userRequest) {
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userRequest.getUsername() != null && !userRequest.getUsername().isEmpty()) {
            existingUser.setUsername(userRequest.getUsername());
        }

        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        if (userRequest.getEmail() != null && !userRequest.getEmail().isEmpty()) {
            existingUser.setEmail(userRequest.getEmail());
        }

        if (userRequest.getFirstName() != null && !userRequest.getFirstName().isEmpty()) {
            existingUser.setFirstName(userRequest.getFirstName());
        }

        if (userRequest.getLastName() != null && !userRequest.getLastName().isEmpty()) {
            existingUser.setLastName(userRequest.getLastName());
        }

        return userRepository.save(existingUser);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/signinn")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDto loginRequest, HttpSession session) {

        System.out.println(loginRequest.getUsername());
        Optional<User> userOptional = userRepository.findUserByUsername(loginRequest.getUsername());

        System.out.println(userOptional);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid email");
        }

        User u = userOptional.get();


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(u.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String ipAddress = getIpAddress();
        System.out.println(ipAddress);
        //String email = u.getEmail();
        Integer numSessions = sessionCountMap.get(u.getEmail());
        if (numSessions == null) {
            numSessions = 1;
        } else if (numSessions >= 10) {
            // Maximum of three sessions reached
            System.out.println("Maximum number of sessions reached for this user");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Maximum number of sessions reached for this user." );
        } else {

            numSessions++;
        }

        sessionCountMap.put(u.getEmail(), numSessions);
        session.setAttribute("userEmail", u.getEmail());

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        //String xForwardedForHeader = request.getHeader("X-FORWARDED-FOR");
        //System.out.println(xForwardedForHeader);
        Map<String, String> result = new HashMap<>();



        System.out.println("user TO connect"+userDetails.getUsername()+
                userDetails.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));

    }
    private String getIpAddress() {
        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            System.out.println("******"+inetAddress.getHostName());
            return inetAddress.getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return null;
        }

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session,@RequestBody String username) {
        Optional<User> user = userRepository.findUserByUsername(username);
        if (user.isPresent()) {
            User u = user.get();
            Integer numSessions = sessionCountMap.get(u.getEmail());


            if (numSessions != null && numSessions > 0) {
                numSessions--;
                sessionCountMap.put(u.getEmail(), numSessions);
            }
            session.invalidate(); // Clear the user's session
        }
        return ResponseEntity.ok("Logged out successfully.");
    }



}
