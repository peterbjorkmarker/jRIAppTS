jRIAppTS framework
======

<b>a RIA framework for building Line of Buisiness (LOB) applications working in HTML5</b>
<br/>
This is a typescript version of the previous (long abandoned) <a href="https://github.com/BBGONE/jRIApp" target="_blank">jRIApp framework</a>
You can watch video of the demo on <a href="http://youtu.be/m2lxFWhJghA" target="_blank">YouTube SPA Demo</a> |
<a href="https://www.youtube.com/watch?v=bqpIARQHPhA" target="_blank">YouTube Views Transitions Animations Demo</a> |
<a href="http://youtu.be/ll_FS2iONV4" target="_blank">YouTube Folder Browser Demo</a><br/>
 
This branch uses generics introduced in typescript. The primary goal of generics here is to reduce type castings and enhance productivity with better intellisence and design time type checkings. 
The data service can generate strongly typed client side domain model (much like how it is used in Microsoft RIA services for silverlight).
See the DEMO project for the example. (the DEMODB.ts file uses autogenerated code.)
The documentation is ready now and you can read about the framework in more details.

jRIAppTS � is an application framework for developing rich internet applications - RIA�s. It consists of two parts � a client and a server parts. 
The client part was written in typescript language. The server part was  written in C#  and the demo application was implemented in ASP.NET MVC (it can also be written in other languages, for example Ruby or Java, but you have to roll up your sleeves and prepare to write them). 
The Server part resembles Microsoft WCF RIA services, featuring data services which is consumed by the clients. 
The Client part resembles  Microsoft Silverlight client development, only it is based on HTML (not XAML), and uses typescript language for coding.
The framework was designed primarily for creating data centric Line of Business (LOB) applications which will work natively in browsers without the need for plugins .
The framework supports a wide range of essential features for creating LOB applications, such as, declarative use of databindings, integration with a server side dataservice, datatemplates, client side and server side data validation, localization, authorization, and a set of UI controls, like the datagrid, the stackpanel , the dataform and a lot of  utility code.
Unlike many other existing frameworks, which use MVC design pattern, the framework uses Model View View Model (MVVM) design pattern for creating applications. 

The framework is distinguished from other frameworks available on the market by the
full stack implementation of the features required for building real world  LOB applications in HTML5. 
It allows the development in a strongly typed environment either on the client or on the server. 
The domain model is used on the client and generated by the code generation feature of the DataService (as a typescript code).

After minification jriapp.js has the size of about 307 KB. When it is gzipped, it is about 70 KB.
I recommend using the ASP.NET MVC 4 bundling feature for managing javascript files. 

<b>Latest changes:</b>
<p>2014-09-19 Added <b>the Nancy framework</b> support by encapsulating the RIAPP DataService in Nancy framework module. Added the NancySelfHost Demo which shows how the jRIAppTS framework
integrates with Nancy. You can test it on your computers, only it is needed to check database connection string to the <b>AdventureWorksLT</b> database.
I ported the DataGridDemo only. The other demos can be ported as well.
</p>
<p>2014-05-22 Added <b>WEB API</b> support by encapsulating the RIAPP DataService in WEB API controller (RIAPP.DataService.WebApi project). Updated DataGrid demo to use WEB API controller instead of ASP.NET MVC controller.
   Also updated RIAPP.DataService.Mvc project and jriapp.js in order to change names of the actions to use a more web friendly style.
   You can see DataServiceController in RIAPP.DataService.Mvc project to see how the names of the actions has changed.
</p>
<p>2014-05-20 Added new implementation (RIAPP.DataService.EF2 project) of specialized BaseDomainService for using Entity Framework 6 DbContext. Previous project RIAPP.DataService.EF
supports the legacy ObjectContext.</p>
<p>2014-05-18 Update to <b>version 2.2.0</b>. Now each databinding expression can be in a separate <b>data-bind</b> attribute. For example the databindings in the select element -<br/>
<code>
 &lt;select id=&quot;prodSCat&quot; size=&quot;1&quot; class=&quot;span2&quot; <b>data-bind</b>=&quot;{this.dataSource,to=filter.ChildCategories}{this.selectedValue,to=filter.childCategoryID,mode=TwoWay}{this.selectedItem,to=filter.selectedCategory,mode=TwoWay}{this.toolTip,to=filter.selectedCategory.Name}&quot; 
 data-view=&quot;options:{valuePath=ProductCategoryID,textPath=Name}&quot;&gt;&lt;/select&gt;
</code>
<br/>can be written as:<br/>
<code>
 &lt;select id=&quot;prodSCat&quot; size=&quot;1&quot; class=&quot;span2&quot;  <b>data-bind-1</b>=&quot;{this.dataSource,to=filter.ChildCategories}&quot; <b>data-bind-2</b>=&quot;{this.selectedValue,to=filter.childCategoryID,mode=TwoWay}&quot;
  <b>data-bind-3</b>=&quot;{this.selectedItem,to=filter.selectedCategory,mode=TwoWay}&quot;
  <b>data-bind-4</b>=&quot;{this.toolTip,to=filter.selectedCategory.Name}&quot;  data-view=&quot;options:{valuePath=ProductCategoryID,textPath=Name}&quot;&gt;&lt;/select&gt;
</code>
<br/>which is much easier to read and write.
</p>
<p>2014-05-17 Tested compilation with TS 1.0.1. Updated compiled javascript files in the demo. All is working.</p>
<p>2014-04-09 Updated the final release. Restored the PostBuild event in jriapp.ts project as it was before. After installation of typescript 1.0 is
needed a computer restart. After it the postbuild event does not need full path to tsc.exe.</p>
<p>2014-04-08 Published final release testedf with ts 1.0. No bugs since last updates. Works like a swiss watch.</p>
<p>2014-03-03 Updates for compatibility with the typescript 0.9.7 compiler. It has a bug https://typescript.codeplex.com/workitem/2233. So a workaround was needed.</p>
<p>2014-02-19 Updated (improved) file and folder browser demo.</p>
<p>2014-02-13 Removed DataForm's isDisabled property , as well as Template's one. They are redundant.
<br/>
Update the docs.
<br/>
Fixed a bug: TemplateElView's onTemplateLoaded was not called when a Template was loaded. (this bug was introduced in the last releases and was not noticed at once)
</p>
<p>2014-02-12 Fixed DataForm's isDisabled property. Docs update.</p>
<p>2014-02-11 Code refactoring. New release.</p>
<p>2014-02-10 Code refactoring. Tooltips unreliable disapearance fix.</p>
<p>2014-02-08 Changed animation implemetation. Now it is applied through databinding. This is more versatile, because it can be changed at runtime.
Also, the DataGrid's details row custom animation can be applied through databinding. The default is - slideUp and slideDown.
</p>
<p>2014-02-07 Implemented views transition animations. The demo was also updated.
P.S. don't forget to clear the browser cache. SPA uses AMD loading and this is a bitch. The browser caches old files.
</p>
<p>2014-02-05<br/>
1) core modules restructuring to remove mutual dependencies between modules - dynacontent, tabs are new modules. 
The datepicker and template modules now contain respective element views.<br/>
2) IEditable and ISubmittable interfaces moved from RIAPP.MOD.utils namespace to the RIAPP namespace. 
So, client side db interfaces needs to be regenerated again, because entities use these interfaces.<br/>
3) Update of the listbox control to correctly handle the situation when the datasource was assinged, and selectedValue was also assigned but the datasource is not filled with data.
 Now, the listbox correctly updates its UI in the situation, when the datasource is filled with the data some time later.<br/>
4) The demo was updated.<br/>
5) The docs were updated.
</p>
<p>2014-02-04 The demo updated to work with jquery 1.10.2, qtip was updated to the version 2. All typescript files were converted to utf-8.
DataGrid was updated. TabsElView was updated. jriapp.css file was updated.
</p>
<p>2014-02-03 jriappTS project now contains the strings used in the framework in a separate file. It contains a folder langs, which can include a different file for each language.
</p>
<p>2014-01-30 Code generation was updated. RIAppDemo project was updated. The SPADemo page now uses requireJS to load user modules.<br/>
Added a <b>spaAMD</b> typescript project which contains user modules only for the SPADemo page (single page application demo).<br/>
The demoTS typescript project contains user modules for all other demo pages.<br/>
</p>
<p>2014-01-28 Listbox control code update.</p>
<p>2014-01-26 Removed global's consts property (it was redundant). Internal code optimization. Docs update - much better fonts and readability.</p>
<p>2014-01-25 Added a new DebugLevel variable to RIAPP module (in order to set a debugging level in the framework). Fixed a bug with the DataView sorting.</p>
<p>2014-01-24 Fixed bug in the ListBox control. Added checks for valid (existing) property names in property change notifications. Updated the DEMO.</p>
<p>2014-01-23 Added the <b>ability to test databindings</b> on the page. For this purpose the global object has a new event handler adding method addOnUnResolvedBinding.
It registers an event handler which will be triggered when the path is not resolved. See the UserGuide.pdf for more info.<br/>
Updated the docs and the demo. 
</p>
--
Maxim V. Tsapov<br/> 
<a href="https://plus.google.com/u/0/+MaximT/posts" target="_blank">I'm on Google+</a>