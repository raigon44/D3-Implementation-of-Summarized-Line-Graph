# D3-Implementation-of-Summarized-Line-Graph

### Steps to replicate the visualization locally:

Requirements: Python (to start the dummy server) TODO: Check chatgpt for more description

* Clone this repository
* Change directory to the folder where this repository was cloned
* Run the below command: python -m http.server 8000
* Open the browser and type localhost:8000


### Communication-minded Visualizations

Communication-minded visualizations are data visualizations designed with a primary focus on effectively conveying information, insights, and messages to a specific audience. The main goal of these visualizations is to facilitate clear and concise communication of complex data and analysis results to non-experts or decision-makers, enabling them to grasp the key takeaways easily.

#### Summarized Line Graphs

Summarized line graph visualization technique  is designed speciﬁcally for data analysts to communicate data to decision-makers more effectively and efﬁciently. The summarized line graph reduces a large and detailed dataset of multiple quantitative time-series into three components.

+ **Representative Data:** provides the audience with a simple but precise description of the whole dataset.
+ **Analytical Highlights:** are added to the visual summary as the second visual component to reduce the time needed to extract useful
insights from the dataset, to ensure it is clear how the insights are extracted, and to minimize the loss of important discoveries during the exploration. This component should be designed to address the speciﬁc insights of interest to the decision-makers.
+ **Data Envelope:** The Data Envelope summarizes the remaining aggregated data to put the ﬁrst two components into context and, therefore, aids the users in identifying possible information bias. It should provide simple yet specific details of the raw data that are not included in the representative data.

* representative data that provides a quick takeaway of the full dataset
* analytical highlights that distinguish speciﬁc insights of interest
* a data envelope that summarizes the remaining aggregated data

For more information about the summarized line graph check the below paper:

[Paper](https://scholar.google.com/scholar_url?url=https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.13696%3Fcasa_token%3DPi1eQ3McmIIAAAAA:tZn1dlHw5hBAObQ_QmWRFTwUFmWdzvAa4HALXz9dtgRIz3_5yvhM1oPTZwQN7MOb9PP4iG5LvAE3txMa&hl=en&sa=T&oi=gsb-gga&ct=res&cd=0&d=16796700672237661042&ei=2Nu6ZL_OBsr2mgHS_argBg&scisig=ABFrs3yvrJgCIaarBpMjCCnEPgOa)


### Dataset

We have used  a dummy dataset for this visualization. The dataset contains 10 stores and their monthly sales.
The data file is store_data.csv

Overall trend in sales in all ten stores
Analytical highlights give the end user the information of the best and worst monthly sales of a store.
Additionaly data enevelope provides the monthly sales for each stores. and this allows for easier comparison with the representative data.

### Details of the visualization



Screenshot of the whole visualization

Explain the red line for overall trend

Explain the data envelope for each store

Key insights 

December is worth more investigation as 4 out of 10 stores have December as their highest selling month

Interacation

Explain how it will help the end-user