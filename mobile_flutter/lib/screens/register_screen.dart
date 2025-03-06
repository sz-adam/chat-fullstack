import 'package:flutter/material.dart';
import 'package:mobile_flutter/screens/login_screen.dart';
import 'package:mobile_flutter/utils/FadePageAnimation.dart';
import 'package:mobile_flutter/utils/route_animation.dart';
import '../utils/background.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/auth_button.dart';
import '../widgets/auth_screen_navigation_button.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _isLoggedIn = false;

  void _handleRegistration() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoggedIn = true;
      });

      Future.delayed(Duration(seconds: 2), () {
        print("Login successful! Username: ${_usernameController.text}");
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Background(),
          FadePageAnimation(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 30),
                child: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Align(
                        alignment: Alignment.center,
                        child: Text(
                          "Create New Account!",
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 30),
                      CustomTextField(
                        icon: Icons.person,
                        hint: "Full name",
                        controller: _usernameController,
                        validator: (value) => value == null || value.isEmpty
                            ? "Full name cannot be empty"
                            : null,
                      ),
                      const SizedBox(height: 20),
                      CustomTextField(
                        icon: Icons.email,
                        hint: "E-mail",
                        controller: _emailController,
                        validator: (value) => value == null || value.isEmpty
                            ? "E-mail cannot be empty"
                            : null,
                      ),
                      const SizedBox(height: 20),
                      CustomTextField(
                        icon: Icons.lock,
                        hint: "Password",
                        isPassword: true,
                        controller: _passwordController,
                        validator: (value) => value == null || value.length < 6
                            ? "Password must be at least 6 characters"
                            : null,
                      ),
                      const SizedBox(height: 20),
                      Center(
                        child: AuthButton(
                            isLoggedIn: _isLoggedIn,
                            onPressed: _handleRegistration,
                            buttonText: "Registration"),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          AuthScreenNavigationButton(
            icon: Icons.login,
            onPressed: () => Navigator.push(
              context,
              SlidePageRoute(page: LoginScreen()),
            ),
          ),
        ],
      ),
    );
  }
}
