# Universidad de La Laguna
# Escuela Superior de Ingeniería y Tecnología
# Grado en Ingeniería Informática
# Informática Básica
#
# @author F. de Sande
# @date March, 16 2023
# @brief A Makefile for the rectangle class TS app
# 

# The all target builds all of the programs handled by the makefile.
all: poker.js

poker.js: poker-client.ts tsconfig.json
	tsc

# Indicate that the all and clean targets do not
# correspond to actual files.
.PHONY: all clean

# The following rule is effectively built into make and
# therefore need not be explicitly specified:
# hello_world.o: hello_world.cc
#
	$(CXX) $(CXXFLAGS) -c $<

# The clean target removes all of the executable files
# and object files produced by the build process
# We can use it for additional housekeeping purposes
clean :
	rm -f *~ 
	rm *.js *.d.ts
	find . -name basura -exec rm {} \;

push:
	git pull 
	git add . 
	git commit -m "Code improvement" 
	git push
