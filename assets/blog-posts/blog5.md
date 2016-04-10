## Question Submission Form

Version 3

SE-4910i Mobile Applications -- iOS	 
Dr. Sebern  
Spring quarter 2014-2015

#### Student name: Zach Posten

Date submitted: 22 April 2015

---

### Question 

What is a UIPopoverController and when should you use it?

*	Context
	*	For my project I wanted to create a pop up from a button which contained a UIPicker so that the user can makes a selection from a list of categories.
	*	The pop up was desirable because it allowed the user to stay in the context of the game that they're playing, simply switching one 'setting', the category currently being used.
	
*	Research
	*	[Apple](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIPopoverController_class/index.html) defines a `UIPopoverController` as a "class is used to manage the presentation of content in a popover. You use popovers to present information temporarily. The popover content is layered on top of your existing content and the background is dimmed automatically. The popover remains visible until the user taps outside of the popover window or you explicitly dismiss it."
	*	Sam Davis provides a nice step by step tutorial [here](https://www.shinobicontrols.com/blog/posts/2014/08/26/ios8-day-by-day-day-21-alerts-and-popovers) for creating a popup.
		*	One noteworthy point is that the code he shows is in fact in order, even though you might assume otherwise.  You must present the popup by calling `presentViewController()` before you can get ahold of the `UIPopoverController` from the `UIViewController`
		*	What is not inherently obvious from his post (unless you read the complete text, which I did not do when simply trying to get a pop up to work) is that using this technique, it is not possible to create a nice pop up on a phone (apart from the iPhone 6 Plus in ladscape mode, which is treated more like an iPad).  Instead, the pop up ends up taking up the entirety of the screen space.
		*	Alternatively, it is possible to use an Alert Controller to make a compact popup in the middle of the phone screen.  It is not as context specific as the pop up as it appears in the center of the screen, but it is feasible on both the iPhone and iPad.
	*	It is not possible to explicitly control the size of the pop up using this method.  Instead, you must change the size of the view controller which is populating the pop up. [Makemegeek.com](http://www.makemegeek.com/uipopovercontroller-example-ios/) provides an example using `UIActionSheet`s where it is possible to explicitly control this size.
	*	In [this article](http://coding.tabasoft.it/ios/a-simple-ios8-popdatepicker/), Valerio Ferrucci describes the beautiful pop up date picker that he created and was gracious enough to to provide open source on [Github](https://github.com/valfer/PopDatePickerApp).  Ferucci managed to have a pop up appear even on an iPhone using a custom nib, but for the exact implementation details please refer to his article and Github project.
	*	Ultimately, because the popover was not natively achievable on an iPhone (the primary device my app is intended for), I (even after *all* of this research) ended up using a plain old `UINavigationController` to display the category selection to the user.  Although this brings them more out of context to the game that they're currently playing, iOS users are already very comfortable with this transition.

*	Status
	*	The question has been painstakingly resolved.
*	Comments
	*	None

*	Distribution preferences
	*	Authorize possible posting on both the SE-4910i course web pages and also on the instructor's blog.