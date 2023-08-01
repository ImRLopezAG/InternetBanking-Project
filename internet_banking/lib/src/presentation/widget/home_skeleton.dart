import 'package:card_swiper/card_swiper.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class HomeSkeleton extends StatelessWidget {
  const HomeSkeleton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(
              top: 20.0,
              left: 20.0,
              right: 20.0,
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20.0),
              child: Shimmer.fromColors(
                baseColor: Colors.blue[900]!,
                highlightColor: Colors.blue[700]!,
                direction: ShimmerDirection.ttb,
                child: Container(
                  height: 200.0,
                  width: double.infinity,
                  color: Colors.blue[900],
                ),
              ),
            ),
          ),
          const SizedBox(height: 15.0),
          Shimmer.fromColors(
            baseColor: Colors.grey,
            highlightColor: Colors.white,
            child: Container(
                height: 10,
                width: 200,
                alignment: Alignment.topLeft,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.grey,
                )),
          ),
          const SizedBox(height: 15.0),
          Swiper(
            itemCount: 5,
            layout: SwiperLayout.STACK,
            itemWidth: size.width * 0.9,
            itemHeight: size.height * 0.25,
            axisDirection: AxisDirection.right,
            itemBuilder: (_, int index) {
              return GestureDetector(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20.0),
                  child: Shimmer.fromColors(
                    baseColor: Colors.blue[900]!,
                    highlightColor: Colors.blue[500]!,
                    direction: ShimmerDirection.ttb,
                    child: Container(
                      height: 200.0,
                      width: double.infinity,
                      color: Colors.blue[900],
                    ),
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 15.0),
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            width: double.infinity,
            height: 150,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Shimmer.fromColors(
                    baseColor: Colors.grey,
                    highlightColor: Colors.white,
                    child: Container(
                        height: 10,
                        width: 200,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: Colors.grey,
                        )),
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: 10,
                    itemBuilder: (_, int index) {
                      return Container(
                          width: 100,
                          height: 100,
                          margin: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 5,
                          ),
                          child: Column(
                            children: [
                              GestureDetector(
                                  child: Shimmer.fromColors(
                                baseColor: Colors.blue[900]!,
                                highlightColor: Colors.blue[500]!,
                                child: CircleAvatar(
                                  radius: 58,
                                  backgroundColor: Colors.blue[900]!,
                                ),
                              )),
                              const SizedBox(height: 5),
                              Shimmer.fromColors(
                                baseColor: Colors.grey[300]!,
                                highlightColor: Colors.grey[100]!,
                                child: Container(
                                  height: 8,
                                  width: 70,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Colors.grey,
                                  ),
                                ),
                              ),
                            ],
                          ));
                    },
                  ),
                ),
              ],
            ),
          ),
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            width: double.infinity,
            height: 150,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Shimmer.fromColors(
                    baseColor: Colors.grey,
                    highlightColor: Colors.white,
                    child: Container(
                        height: 10,
                        width: 200,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: Colors.grey,
                        )),
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: 10,
                    itemBuilder: (_, int index) {
                      return Container(
                          width: 100,
                          height: 100,
                          margin: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 5,
                          ),
                          child: Column(
                            children: [
                              GestureDetector(
                                  child: Shimmer.fromColors(
                                baseColor: Colors.blue[900]!,
                                highlightColor: Colors.blue[500]!,
                                child: CircleAvatar(
                                  radius: 58,
                                  backgroundColor: Colors.blue[900]!,
                                ),
                              )),
                              const SizedBox(height: 5),
                              Shimmer.fromColors(
                                baseColor: Colors.grey[300]!,
                                highlightColor: Colors.grey[100]!,
                                child: Container(
                                  height: 8,
                                  width: 70,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Colors.grey,
                                  ),
                                ),
                              ),
                            ],
                          ));
                    },
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
