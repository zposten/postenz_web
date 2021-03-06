## Question Submission Form

Version 2

SE-4910i Mobile Applications -- iOS	
Dr. Sebern  
Spring quarter 2014-2015

#### Student name: Zach Posten

Date submitted: 18 March 2015

---

### Questions

1. It has been mentioned that there are three completely different ways to create a UI for an iOS app.  What are the advantages and disadvantages of each, and is there a particular one which the community prefers?
	* Context
		* In lab for the last two weeks, we have been doing a lot of 'dragging and dropping' in order to both create the user interfaces, and even generate some of the necessary code for our applications.  This is very different from how I've created user interfaces in the past and got me wondering if it was the preferred method.
	* Research
		* I found an article written by Chris Ching on his website [codewithchris.com](http://codewithchris.com/xcode-using-storyboards-and-xibs-versus-creating-views-programmatically/) discussing this very topic
		* **Using XIBs**
			* Pros
				* Straightforward for small apps
				* You can have seperate XIBs for different localizations
			* Cons
				* It's difficult to manage conflicts when working with a team 
				* Highly dynamic views are impossible
				* Lacks customization which is possible to do with code
		* **Storyboards**
			* Pros
				* Nice for appps with a small to medium number of screens where the requirements for navigation between views is relatively straightforward
				* You can mock an application without writing mich, if any, code
				* Apple seems to be pushing this method
			* Cons
				* Not compatible with pre-iOS 5, so it makes supporting iOS 4.3 impossible
				* Again, working in parallel with a team is difficult 
		* **Creating Views Programmatically**
			* Pros
				* Easier to merge conflicts and diff lines of code than an XIB file or storyboard
				* You can trace through code when debugging and not have to look at the Interface Builder
				* Gives you more control and free reign
			* Cons
				* It's harder to visualize the UI and grasp a mental picture of what it will look like
				* You can't visually position elements
	* Status
		* Not completely resolved
		* The referenced article was written in 2013, and we all know how fast mobile technologies change.  
		* I was not able to to find enough information to generalize the community's opinion on the topic