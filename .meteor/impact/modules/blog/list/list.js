
Template.list.documents = function() {
  console.log("DOCUMENTS FOR BLOG LIST TEMPLATE", Documents.find({}));
  return Documents.find({});
}


Template.listEntry.mname = Name;