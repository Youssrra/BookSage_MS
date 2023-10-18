package tn.esprit.ms_gestion_utilisateur.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;

import tn.esprit.ms_gestion_utilisateur.Dto.LoginDto;
import tn.esprit.ms_gestion_utilisateur.Dto.SignUpDto;
import tn.esprit.ms_gestion_utilisateur.Entity.ERole;
import tn.esprit.ms_gestion_utilisateur.Entity.Role;
import tn.esprit.ms_gestion_utilisateur.Entity.User;
import tn.esprit.ms_gestion_utilisateur.Repository.RoleRepository;
import tn.esprit.ms_gestion_utilisateur.Repository.UserRepository;
//import tn.esprit.ms_gestion_utilisateur.SecurityConfig.JwtUtils;
//import tn.esprit.ms_gestion_utilisateur.SecurityConfig.TokenService;
//import tn.esprit.ms_gestion_utilisateur.Services.UserDetailsImpl;
import tn.esprit.ms_gestion_utilisateur.Services.UserService;

import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    //@Autowired
    // private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto request) {

            Optional<User> user = userRepository.findUserByUsername(request.getUsername());

            if (!user.isPresent() || !passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            return ResponseEntity.ok("Login successful");

    }


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

    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable("userId") Integer userId) {
        return  new ResponseEntity<>(userService.getUserById(userId),HttpStatus.OK);
    }

    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/remove/{userId}")
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
  public ResponseEntity<User> updateUserInit(@PathVariable Integer userId, @RequestBody User userRequest) {
      try {
          User updatedUser = updateUser(userId, userRequest);
          return ResponseEntity.ok(updatedUser);
      } catch (IllegalArgumentException e) {
          return ResponseEntity.notFound().build();
      }
  }

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



}
