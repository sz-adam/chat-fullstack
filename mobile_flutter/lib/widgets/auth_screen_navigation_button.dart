import 'package:flutter/material.dart';

class AuthScreenNavigationButton extends StatefulWidget {
  final IconData icon;
  final VoidCallback onPressed;

  const AuthScreenNavigationButton({
    Key? key,
    required this.icon,
    required this.onPressed,
  }) : super(key: key);

  @override
  _AuthScreenNavigationButtonState createState() =>
      _AuthScreenNavigationButtonState();
}

class _AuthScreenNavigationButtonState extends State<AuthScreenNavigationButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );

    // animáció lentről felfelé
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _controller.forward(); // Animáció indítása
  }

  // Erőforrások felszabadítása
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 0,
      right: 30,
      child: SlideTransition(
        position: _slideAnimation,
        child: Container(
          height: 100,
          width: 80,
          decoration: BoxDecoration(
            color: Colors.green.shade500,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(50)),
          ),
          child: Center(
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                shape: const CircleBorder(),
                backgroundColor: Colors.white.withOpacity(0.3),
                elevation: 0,
                padding: const EdgeInsets.all(15),
              ),
              onPressed: widget.onPressed,
              child: Icon(widget.icon, color: Colors.white, size: 24),
            ),
          ),
        ),
      ),
    );
  }
}
