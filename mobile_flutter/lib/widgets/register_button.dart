import 'package:flutter/material.dart';

class RegisterButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 0,
      right: 30,
      child: Container(
        height: 100,
        width: 80,
        decoration: BoxDecoration(
          color: Colors.green.shade500,
          borderRadius:const BorderRadius.vertical(top: Radius.circular(50)),
        ),
        child: Center(
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              shape:const CircleBorder(),
              backgroundColor: Colors.white.withOpacity(0.3),
              elevation: 0,
              padding: const EdgeInsets.all(15),
            ),
            onPressed: () {},
            child: const Icon(Icons.person_add, color: Colors.white, size: 24),
          ),
        ),
      ),
    );
  }
}
