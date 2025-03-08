import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/screens/home_screen.dart';
import 'package:mobile_flutter/screens/login_screen.dart';
import 'package:mobile_flutter/utils/FadePageAnimation.dart';
import 'package:mobile_flutter/utils/route_animation.dart';
import '../providers/auth_provider.dart';
import '../utils/background.dart';
import '../widgets/CustomCheckbox.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/auth_button.dart';
import '../widgets/auth_screen_navigation_button.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  bool _isLoggedIn = false;
  String? _selectedGender;

  void _handleRegistration() async {
    if (_formKey.currentState!.validate()) {
      if (_selectedGender == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Please select a gender")),
        );
        return;
      }

      try {
        final authNotifier = ref.read(authProvider.notifier);
        await authNotifier.register(
          _usernameController.text,
          _emailController.text,
          _passwordController.text,
          _selectedGender!,
        );

        if (mounted) {
          setState(() {
            _isLoggedIn = true;
          });

          await Future.delayed(Duration(seconds: 1));

          if (mounted) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => HomeScreen()),
            );
          }
        }
      } catch (error) {
        print("Error during registration: $error");
      }
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

                      // Gender selection in a Row

                      const SizedBox(height: 10),
                      Center(
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            CustomCheckbox(
                              label: "Male",
                              isSelected: _selectedGender == "Male",
                              activeColor: Colors.blue,
                              onTap: () {
                                setState(() {
                                  _selectedGender =
                                      _selectedGender == "Male" ? null : "Male";
                                });
                              },
                            ),
                            const SizedBox(width: 30),
                            CustomCheckbox(
                              label: "Female",
                              isSelected: _selectedGender == "Female",
                              activeColor: Colors.pink,
                              onTap: () {
                                setState(() {
                                  _selectedGender = _selectedGender == "Female"
                                      ? null
                                      : "Female";
                                });
                              },
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 20),

                      Center(
                        child: AuthButton(
                          isLoggedIn: _isLoggedIn,
                          onPressed: _handleRegistration,
                          buttonText: "Register",
                        ),
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
