import 'package:flutter/material.dart';
import 'package:mobile_flutter/screens/register_screen.dart';
import 'package:mobile_flutter/utils/FadePageAnimation.dart';
import 'package:mobile_flutter/utils/route_animation.dart';
import '../utils/background.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/auth_button.dart';
import '../widgets/auth_screen_navigation_button.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _isLoggedIn = false;

  void _handleLogin() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoggedIn = true;
      });

      Future.delayed(Duration(seconds: 2), () {
        print("Login successful! Username: ${_emailController.text}");
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
                          "Welcome Back!",
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 30),
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
                            onPressed: _handleLogin,
                            buttonText: "Login"),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          AuthScreenNavigationButton(
            icon: Icons.person_add,
            onPressed: () {
              Navigator.push(
                context,
                SlidePageRoute(page: RegisterScreen()),
              );
            },
          ),
        ],
      ),
    );
  }
}
