class armies():
    def __init__ (self, strList):
        """
        strList a 2-D list, each inner list is a line of input
        defined in diplomacy_solve
        """
        self.strList = strList
        self.cityList = []
        self.mappedList = []

    
    def mapping(self):
        """
        modifies mappedList to a 2-D list
        first element of each inner list is name of city,
        second element is name of army, 
        representing their initial location
        """
        for i in self.strList:      
        # this line is not needed since each army initially locates in different city      
        # if i[1] not in self.cityList:
            self.cityList.append(i[1])

        for i in self.cityList:
            self.mappedList.append([i])

        # for loop places each army into their initial city 
        # or the city they attack in mappedList
        nth_city = 0
        while nth_city < len(self.cityList):
            if self.strList[nth_city][2] == 'Move':
                moveCity = self.strList[nth_city][3]
                for city in self.mappedList:
                    if city[0] == moveCity:
                        # checks if dictionary was already created
                        # if one exists, will add to it
                        if len(city) > 1:
                            city[1].update({self.strList[nth_city][0]:0})
                             
                        else:
                            city.append( {self.strList[nth_city][0]:0} )


            else:
                self.mappedList[nth_city].append( {self.strList[nth_city][0]:0} )
            nth_city += 1 
            

    def support(self):
        # Assigns support to armies
        nth_city = 0
        while nth_city < len(self.cityList):
            if self.strList[nth_city][2] == 'Support':
                supportValid = True
                # this for loop checks if the support is valid
                for i in range(len(self.mappedList)):
                    if len(self.mappedList[i]) > 1 :
                        if len(self.mappedList[i][1]) > 1:
                        
                            if (self.mappedList[i][1].get(self.strList[nth_city][0])) != None:
                                #print("Invalid support")
                                supportValid = False
                                
                
                if supportValid:
                    # adds support
                    for i in range(len(self.mappedList)):
                        if len(self.mappedList[i]) > 1 :
                            if len(self.mappedList[i][1]) > 1:            
                                if (self.mappedList[i][1].get(self.strList[nth_city][3])) != None:                    
                                    self.mappedList[i][1].update({(self.strList[nth_city][3]) : (self.mappedList[i][1].get(self.strList[nth_city][3]) + 1)})

            
            nth_city += 1
        # print(self.mappedList)
        


    def clash(self):
        # Carries out the attacks
        for i in range(len(self.mappedList)):
            if len(self.mappedList[i]) > 1:
                #checks if more than 1 army occupy a city
                if len(self.mappedList[i][1]) > 1:
                       keyList = list(self.mappedList[i][1].keys())
                       valueList = list(self.mappedList[i][1].values())
                       
                       if (valueList.count(max(valueList))) > 1:
                           self.mappedList[i].pop(1)
                       else:
                           
                           self.mappedList[i].pop()
                           self.mappedList[i].append({keyList[valueList.index(max(valueList))] : 0})

        # print(self.mappedList)

# -------------
# diplomacy_solve
# -------------

def diplomacy_solve(r, w):
    """
    r a reader
    w a writer
    """
    strList = []
    for s in r:
        a = s.split( )
        strList.append(a)

    assert len(strList) > 0 

    
    x = armies(strList)
    x.mapping()
    x.support()

    assert x.mappedList[0][0] is str(x.mappedList[0][0])
    
    x.clash()

    armyList = []
    for line in strList:
        armyList.append(line[0])

    diplomacy_format(w, armyList, x.mappedList)

    assert x.mappedList[0][0] is str(x.mappedList[0][0])
    

    


# -------------
# diplomacy_format
# -------------

def diplomacy_format(w, armyList, mappedList):
    """
    w the writer
    armyList a list of amries
    mappedList the instance variable from the armies class
    formats the mappedList into the writer
    """

    for army in armyList:
        nth_city = 0
        temp = []
        while nth_city < len(mappedList):
            if len(mappedList[nth_city]) > 1: 
                for key in mappedList[nth_city][1].keys():
                    if key == army:
                        temp = [army, mappedList[nth_city][0] ]
                        mappedList[nth_city].pop(1)
                        nth_city -= 1

            nth_city += 1
       
        if len(temp) == 0:
            temp = [army, "[dead]"]
        # print(temp)
        diplomacy_print(w, temp[0], temp[1])

    assert len(armyList) > 0


# -------------
# diplomacy_print
# -------------

def diplomacy_print(w, u, v):
    """
    print two strings
    w a writer
    u the name of army
    v the location of army
    """
    w.write(str(u) + " " + str(v) + "\n")



    
