function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<template name=\"krowa\">\n  <div class=\"boot\">ASDF: ";
  if (stack1 = helpers.osiem) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.osiem; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n  ";
  stack1 = self.invokePartial(partials.siano, 'siano', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</template>\n";
  return buffer;
  }
