## Question Submission Form

Version 3

SE-4910i Mobile Applications -- iOS	 
Dr. Sebern  
Spring quarter 2014-2015

#### Student name: Zach Posten

Date submitted: 1 April 2015

---

### Question 1

What is the purpose of a pound symbol in a Swift method parameter list?

*	Context
	*	In the Twitter Searches lab we began this week, several methods contained a '#' symbol and it was unclear what the exact functionality of this symbol is.
	
*	Research
	*	A Google search led me to apple's developer page which described the use of the "hash symbol".  It is a shorthand symbol which indicates that the the local parameter name that it is placed before should be used as the internal *and* external parameter name.
	*	This explanation was confusing, because as I understood it if one were to not use an explicit external parameter name, the internal name would *already* be used as the external name as well.  It turns out, however, that this is not the case.  An internal parameter name is not visible to the external world, thus the need for the external name.  I also learned that if external parameter names are specified, these names *must* be specified when the method is called.  I was always under the assumption that they were optional.

*	Status
	*	Question has been resolved.

*	Comments
	*	None

*	Distribution preferences
	*	Authorize possible posting on both the SE-4910i course web pages and also on the instructor's blog.


### Question 2

How useful is the Swift programming language outside of iOS apps?

*	Context
	*	Different programming languages offer the programmer various benefits over its competitors and the language is usually chosen based upon the task the developer hopes to accomplish.  Outside of creating iOS applications (where the developer has little choice in the matter), is there a situation where the Swift programming language would be particularly beneficial to the implementer?  
	
*	Research
	*	 An [article on the Huffington Post](http://www.huffingtonpost.com/gabe-sumner/why-most-developers-shoul_b_5454013.html) suggested that "most developers should avoid" Swift because of Apple's minority in the global smart phone market.
	*	 David Auerbach suggests in [this article](http://www.slate.com/articles/technology/technology/2014/06/apple_wwdc_2014_the_company_introduces_a_new_programming_language_called.html) that Swift should never have been created, as all of its functionality already exists in other programming languages.
	*	 Cade Metz points out on behalf of [wired.com](http://www.wired.com/2014/07/apple-swift/) that Swift (true to its name) gives developers the best of both compiled languages and interpreted languages when it comes to speed.
	*	 It is rumored that Apple intends to make the Swift compiler open source, though I could not find this from a particularly reliable source.  If the compiler were to become open source, I could see Swift being used outside the Apple ecosystem in the same way that C# is used outside of Microsoft.  

*	Status
	*	Answers to this question were particularly hard to find, but I was able to find answers to several related questions which collectively form some sort of an answer, though surely not a complete one.

*	Comments
	*	None

*	Distribution preferences
	*	Authorize possible posting on both the SE-4910i course web pages and also on the instructor's blog.