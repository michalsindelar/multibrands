# Multibrands

Ever needed to compile multiple main `css` files for different color brands?

Prepared simple `grunt` task together with `stylus` variables mapping. **No settings needed!**


## Settings

Into `brands` folder past brand `.json` files in following scheme:

```
{
  "theme": {

    "stylus-vars": {
      "var-1": "value-1",
      "var-2": "value-2",
      "var-3": "value-3",
      "var-4": "value-4",
      "var-5": "value-5",
    }
  }
}
```

In one of your `stylus` files paste following variables mapping:

```
for var in theme
	define("$"+var, theme[var])
	// define(var, theme[var]) // uncomment if you are used to use variables withou `$` prefix
```


**That's it! 🍺🍺**

---

See (examples)[examples/] folder for working demo.

