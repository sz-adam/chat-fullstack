import 'package:flutter/material.dart';
import 'package:flutter_custom_clippers/flutter_custom_clippers.dart';

class Background extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Colors.blue.shade800,
                Colors.blue.shade600,
                Colors.green.shade500,
                Colors.green.shade300,
                Colors.teal.shade400,
              ],
            ),
          ),
        ),
        ClipPath(
          clipper: WaveClipperTwo(),
          child: Container(
            height: 220,
            color: Colors.white.withOpacity(0.15),
          ),
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: ClipPath(
            clipper: WaveClipperTwo(reverse: true),
            child: Container(
              height: 220,
              color: Colors.white.withOpacity(0.15),
            ),
          ),
        ),
      ],
    );
  }
}
