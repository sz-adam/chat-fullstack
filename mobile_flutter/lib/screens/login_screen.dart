import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/screens/home_screen.dart';
import 'package:mobile_flutter/screens/register_screen.dart';
import 'package:mobile_flutter/utils/FadePageAnimation.dart';
import 'package:mobile_flutter/utils/route_animation.dart';
import '../providers/auth_provider.dart';
import '../utils/background.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/auth_button.dart';
import '../widgets/auth_screen_navigation_button.dart';

class LoginScreen extends ConsumerWidget {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final authNotifier = ref.read(authProvider.notifier);

    void _handleLogin() async {
      if (_formKey.currentState!.validate()) {
        await authNotifier.login(
          _emailController.text,
          _passwordController.text,
        );

        // animáció lefutása után navigál át
        if (ref.read(authProvider).isAuthenticated) {
          await Future.delayed(const Duration(milliseconds: 800));

          // Navigálás
          if (context.mounted) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => HomeScreen()),
            );
          }
        }
      }
    }

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
                      if (authState.errorMessage != null)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: Text(
                            authState.errorMessage!,
                            style: const TextStyle(
                                color: Colors.red, fontSize: 16),
                          ),
                        ),
                      Center(
                        child: AuthButton(
                          isLoggedIn: authState.isAuthenticated,
                          onPressed: _handleLogin,
                          buttonText: "Login",
                        ),
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
