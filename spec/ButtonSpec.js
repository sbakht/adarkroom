describe("Button", function() {
  var btn;
  var options = {};

  beforeEach(function() {
    btn = {Button : Button.Button};
    btn.addClass = function() {};
    btn.removeClass = function() {};
    btn.data = function() {};
    window.Engine = { getGuid : function() {} };
    options.click = function() {};
  });

  describe("options", function() {

    beforeEach(function() {
      spyOn(Engine,"getGuid");
      spyOn(Button,"cooldown");
    });

    describe("cooldown", function() {

      it("should be defined when options->cooldown is a number", function() {
        options.cooldown = 1;
        btn.Button(options);
        expect(btn.data_cooldown).toBeDefined();
      });

      it("should be undefined when options->cooldown is not a number", function() {
        options.cooldown = "not a number";
        btn.Button(options);
        expect(btn.data_cooldown).toBeUndefined();
      });
    });

    describe("data_handler", function() {

      it("should be defined options->click is a function", function() {
        btn.Button(options);
        expect(btn.data_handler).toBeDefined();
      });
    });

    describe("click", function() {
      var el;
      var argReturns;

      beforeEach(function() {
        el = btn.Button(options);
        argReturns = {"disabled": true};
      });

      it("should start cooldown when enabled", function() {
        el.trigger("click");
        expect(Button.cooldown).toHaveBeenCalled();
      });

      it("should not start cooldown when disabled", function() {
        spyOn($.prototype,'hasClass').andCallFake(function(args) {
          return argReturns[args];
        });

        Button.cooldown.reset(); //Button.cooldown gets called outside of the click
        el.trigger("click");
        expect($.prototype.hasClass).toHaveBeenCalledWith("disabled");
        expect(Button.cooldown).not.toHaveBeenCalled();
      });
    });
  
  });

  describe("isDisabled", function() {

    it("should return true", function() {
        spyOn(btn, 'data').andReturn(true);
        var result = Button.isDisabled(btn);
        expect(result).toBeTruthy();
    });

    it("should return false", function() {
        spyOn(btn, 'data').andReturn(false);
        var result = Button.isDisabled(btn);
        expect(result).toBeFalsy();
    });

    it("should return false when btn is undefined", function() {
        btn = undefined;
        var result = Button.isDisabled(btn);
        expect(result).toBeFalsy();
    });
  });

  describe("setDisabled", function() {

    beforeEach(function() {
        spyOn(btn,'addClass');
        spyOn(btn,'removeClass');
    });

    it("should enable btn", function() {
        spyOn(btn,'data').andCallFake(function(args) {
          if(args == 'onCooldown') {
            return false;
          }
        });
        var result = Button.setDisabled(btn, false);
        expect(btn.data).toHaveBeenCalledWith('onCooldown');
        expect(btn.removeClass).toHaveBeenCalled();
    });

    it("should disable btn", function() {
        var result = Button.setDisabled(btn, true);
        expect(btn.addClass).toHaveBeenCalled();
    });
  });

  describe("cooldown", function() {

  });

});
