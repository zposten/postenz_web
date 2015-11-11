## Question Submission Form

Version 3

SE-4910i Mobile Applications -- iOS	 
Dr. Sebern  
Spring quarter 2014-2015

#### Student name: Zach Posten

Date submitted: 6 May 2015

---

### Question 
Inside of a view controller, how do I initialize one variable to the value of another?

*	Context
	*	In my application there is a timer, and I have variables for both the initial value of the timer `timerStartingValue` and the current value of the timer `timerValue` (which gets decremented as the timer counts down).  In this way, when the timer is reset I know what to reset it to and I can also change this value during run time in the apps settings.
	*	I want to initially set the current value of `timerValue` to whatever `timerStartingValue` is set to so that when the timer begins counting down for the first time it begins from the correct value.	
	
*	Research
	*	If I attempt to simply set `timerValue` equal to `timerStartingValue`, `var timerValue : Int = timerStartingValue`, I get the error “‘ViewController.Type’ does not have a member named ‘timerStartingValue`”.  In Swift it is not valid to have one global variable reference another.  The purpose of this is to avoid possible circular references such that neither variable ever gets initialized.
	*	The next logical step I came up with was to set `timerValue` inside of the `viewDidLoad()` function.  The issue with this is that a compiler error is thrown dictating that the “Class ‘ViewController’ has no initializers”.  The reason for this is that the `init()` function of the class needs to be able to give each variable of the class an initial value when the object is instantiated.  Because this initial value isn’t given until the `viewDidLoad()` function is called, which by definition must be called after the object is instantiated, this requirement is not satisfied.
	*	It then makes sense to add an explicit `init()` method to the class and initialize `timerValue` in there. 
    `required init(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder); timerValue = timerStartingValue }`.  
		This results in the same problem as before, with the `init()` being called (this time explicitly) before `timerValue` is set.
	*	Moving the assignment of `timerValue` before the `init()` call then results in “Use of ‘self’ in property access ‘timerStartingValue’ before super.init initializes self”.  This is saying that you’re trying to access a member of the class before the class is instantiated, which is impossible because the member doesn’t yet exist to be accessed.
	*	At this point I felt as though I had tried every possible solution to this simple problem.  Once again however, Dr. Sebern comes to the rescue!  He suggested that I make `timerValue` an optional by declaring it `var timerValue : Int?`.  This way, it is automatically initialized to `nil` when `init()` is called.  Then in `viewDidLoad()`,  `timerValue` can be assigned to `timerStartingValue`, as we have been attempting to do this whole time, with no compilation errors. 
	*	It is worth noting here that because `timerValue` is an optional, it must be unwrapped before use later in the code.

*	Status
	*	The question has been resolved.
*	Comments
	*	None

*	Distribution preferences
	*	Authorize possible posting on both the SE-4910i course web pages and also on the instructor's blog.