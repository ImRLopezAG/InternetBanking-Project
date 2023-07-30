import 'package:flutter/material.dart';

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  final GlobalKey<ScaffoldState> drawerKey;
  final String title;
  const TopBar(
      {Key? key, required this.drawerKey, this.title = 'Internet Banking'})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120.0,
      decoration: BoxDecoration(
        color: Colors.blue[900]!,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(
            49.0,
          ),
          bottomRight: Radius.circular(
            49.0,
          ),
        ),
      ),
      child: Container(
        margin: const EdgeInsets.only(
          top: 20.0,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                left: 20.0,
              ),
              child: CircleAvatar(
                radius: 30.0,
                backgroundColor: Colors.white,
                child: IconButton(
                  onPressed: drawerKey.currentState!.openDrawer,
                  icon: Icon(Icons.person, color: Colors.blue[900], size: 30.0),
                ),
              ),
            ),
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            Padding(
              padding: const EdgeInsets.only(
                right: 20.0,
              ),
              child: IconButton(
                onPressed: () {},
                icon: const Icon(
                  Icons.search_rounded,
                  color: Colors.white,
                  size: 30.0,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(100.0);
}
