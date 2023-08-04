import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class ProductProvider with ChangeNotifier {
  final ProductRepository _productRepository = ProductRepository();

  Future<List<ProductModel>> getAll({required String token, required String id}) async {
    final response = await _productRepository.getAll(token: token, id: id);
    _products = response;
    return response;
  }

  List<ProductModel> _products = [];

  List<ProductModel> get products => _products;

  ProductModel get principal =>
      products.firstWhere((product) => product.principal == true);

  List<ProductModel> get others => products.where((product) => product.principal == false).toList();

  Future<ProductModel> getPrincipalForOwner({required String owner, required String token}) async{
    final response = await _productRepository.getPrincipal(owner: owner, token: token);
    return response;
  }
}
