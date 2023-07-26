class BaseModel{
  int? id;
  String? createdAt;

  BaseModel({this.id, this.createdAt});

  BaseModel.fromJson(Map<String, dynamic> json){
    id = json['_id'];
    createdAt = json['createdAt'];
  }
}