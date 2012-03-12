fs        = require 'fs'
{ files } = require('./src/config.coffee')
{ exec }  = require 'child_process'

compile = ->
	exec 'coffee --compile --output src/tmp/src/js/ src/coffee/', (err, stdout, stderr) ->
		throw err if err

		console.log stdout + stderr
		
		compFiles = []
		for file in files
			fileConcat = ''
			for dep in file.deps
				fileConcat += fs.readFileSync "src/tmp/src/js/#{dep}.js", 'utf8'

			compFiles.push { name: file.name, content: fileConcat }

		try
	 	 fs.mkdirSync "src/tmp/bin", 0777
		catch error		  
			# Don't do anything because the dir exists and we don't need to worry about it.

		try
			fs.mkdirSync "src/tmp/bin/js", 0777
		catch error
			# Don't do anything here either.

		for file in compFiles
			fs.writeFileSync "src/tmp/bin/js/#{file.name}.js", file.content, 'utf8'

task 'build:compress', 'Compress and concatenate JavaScript files together.', ->
	compile()

task 'build', 'Concatenate JavaScript files together.', ->
	compile()