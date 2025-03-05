import 'package:flutter/material.dart';
import '../widgets/background.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/login_button.dart';
import '../widgets/register_button.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _isLoggedIn = false;

  void _handleLogin() {
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
          Center(
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
                      icon: Icons.person,
                      hint: "Username",
                      controller: _usernameController,
                      validator: (value) => value == null || value.isEmpty
                          ? "Username cannot be empty"
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
                      child: LoginButton(isLoggedIn: _isLoggedIn, onPressed: _handleLogin),
                    ),
                  ],
                ),
              ),
            ),
          ),
          RegisterButton(),
        ],
      ),
    );
  }
}
