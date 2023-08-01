import 'package:flutter/material.dart';
import 'package:card_swiper/card_swiper.dart';

class CardSwipper extends StatelessWidget {
  const CardSwipper({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Swiper(
      itemCount: 5,
      layout: SwiperLayout.STACK,
      itemWidth: size.width * 0.9,
      itemHeight: size.height * 0.25,
      axisDirection: AxisDirection.right,
      itemBuilder: (_, int index) {
        return GestureDetector(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20.0),
            child: Container(
              color: Colors.blue[900],
              child: Center(
                child: Text(
                  'Item $index',
                  style: const TextStyle(
                    fontSize: 30.0,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
