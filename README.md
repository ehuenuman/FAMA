<p align="center">
<img src="https://raw.githubusercontent.com/ehuenuman/FAMA/master/static/img/fama_icono.png" alt="FAMA">
<br>FAMA
</p>

# _Formative Assessment using Mobile Accessory_

FAMA is a Classroom Response System that reduces the teacher-student feedback time supporting the learning process and encourages the use and benefits of formative assessments.

The main feature is the implementation of the [IMS-QTI Specification v.2.2](https://www.imsglobal.org/question/index.html#version2.2), which defines different interactions (types of questions) and allows the interoperability between [platforms](https://en.wikipedia.org/wiki/QTI#Applications_with_IMS_QTI_support).

## Supported interactions

- Simple Interaction
- Order Interaction
- Inline Choice Interaction
- Text Entry Interaction
- Associate Interaction
- Slider Interaction

## Technologies used

- Django
- HTML
- CSS ([Materialize](https://materializecss.com/))
- JavaScript

# Screenshots

<center>
<img src="https://raw.githubusercontent.com/ehuenuman/FAMA/master/static/img/screenshots/home.png" width="auto" height="300px"></img>
<img src="https://raw.githubusercontent.com/ehuenuman/FAMA/master/static/img/screenshots/resultados.png" width="auto" height="300px"></img>
</center>
<center>
<img src="https://raw.githubusercontent.com/ehuenuman/FAMA/master/static/img/screenshots/mis_cursos.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/ehuenuman/FAMA/master/static/img/screenshots/mis_preguntas.png" width="30%"></img>
<img src="https://raw.githubusercontent.com/ehuenuman/FAMA/master/static/img/screenshots/formativas_finalizadas.png" width="30%"></img>
</center>

# A bit of history

The project started as an idea to have a bank of questions that can be created, used, and shared by any teacher. At that time, everything was missing: the questions and the platform to display them.

The first version in 2013, called Mobile-QTI, displayed the basic interactions of the specification. This version used the [AquRate Authoring Tool](https://www.webarchive.org.uk/wayback/archive/20140614053443/http://www.jisc.ac.uk/whatwedo/programmes/elearningcapital/eassessment/aqurate.aspx) to create the questions.
In 2015, the implementation of two new web applications would help Mobile-QTI.

1. MAs Editor (Mobile Assessment Editor) would be in charge of creating and editing the questions replacing the use of AquRate.
2. Test-QTI would be in charge of creating tests under the IMS-QTI specification.

These three tools would be united under the same system creating a bank of questions and tests.

Then, in 2016, they sought to improve student performance through formative tests, but their creation, evaluation, and feedback were time-consuming. For this reason, it was decided to implement the three platforms in one to prevent the user from constantly jumping between them and add options that allowed the teacher to monitor their students.

Finally, this project results from two graduation processes (final project) of the career in Civil Engineering in Information Technology with the support of the Learning Technologies Research Group (GITA).

## More about the learning process and use of FAMA

📄 **Supporting Formative Assessment Using a Class Response System FAMA**
Proceedings of the 13th International Conference on e-Learning. ICEL 2018 · Jul 5, 2018.<br>[View the paper](https://books.google.co.nz/books?hl=es&lr=&id=KEJmDwAAQBAJ&oi=fnd&pg=PA10&ots=H0fXtRme7D&sig=Bcsnlo3LScTp_qkqQHz4pPdYm_Q&redir_esc=y#v=onepage&q&f=false)
