declare type sqlite3_default = typeof sqlite3.dbapi2
declare type tkinter_default = typeof tkinter.constants
declare module base64 {
	var _

	/**
	 * Encode the bytes-like object s using Base64 and return a bytes object.
	 * 
	 *     Optional altchars should be a byte string of length 2 which specifies an
	 *     alternative alphabet for the '+' and '/' characters.  This allows an
	 *     application to e.g. generate url or filesystem safe Base64 strings.
	 *     
	 */
	function b64encode(s, altchars?): Promise<any>
	function b64encode$({ s, altchars }: { s, altchars?}): Promise<any>

	/**
	 * Decode the Base64 encoded bytes-like object or ASCII string s.
	 * 
	 *     Optional altchars must be a bytes-like object or ASCII string of length 2
	 *     which specifies the alternative alphabet used instead of the '+' and '/'
	 *     characters.
	 * 
	 *     The result is returned as a bytes object.  A binascii.Error is raised if
	 *     s is incorrectly padded.
	 * 
	 *     If validate is False (the default), characters that are neither in the
	 *     normal base-64 alphabet nor the alternative alphabet are discarded prior
	 *     to the padding check.  If validate is True, these non-alphabet characters
	 *     in the input result in a binascii.Error.
	 *     
	 */
	function b64decode(s, altchars?, validate?: boolean): Promise<any>
	function b64decode$({ s, altchars, validate }: { s, altchars?, validate?}): Promise<any>

	/**
	 * Encode bytes-like object s using the standard Base64 alphabet.
	 * 
	 *     The result is returned as a bytes object.
	 *     
	 */
	function standard_b64encode(s): Promise<any>
	function standard_b64encode$({ s }): Promise<any>

	/**
	 * Decode bytes encoded with the standard Base64 alphabet.
	 * 
	 *     Argument s is a bytes-like object or ASCII string to decode.  The result
	 *     is returned as a bytes object.  A binascii.Error is raised if the input
	 *     is incorrectly padded.  Characters that are not in the standard alphabet
	 *     are discarded prior to the padding check.
	 *     
	 */
	function standard_b64decode(s): Promise<any>
	function standard_b64decode$({ s }): Promise<any>

	/**
	 * Encode bytes using the URL- and filesystem-safe Base64 alphabet.
	 * 
	 *     Argument s is a bytes-like object to encode.  The result is returned as a
	 *     bytes object.  The alphabet uses '-' instead of '+' and '_' instead of
	 *     '/'.
	 *     
	 */
	function urlsafe_b64encode(s): Promise<any>
	function urlsafe_b64encode$({ s }): Promise<any>

	/**
	 * Decode bytes using the URL- and filesystem-safe Base64 alphabet.
	 * 
	 *     Argument s is a bytes-like object or ASCII string to decode.  The result
	 *     is returned as a bytes object.  A binascii.Error is raised if the input
	 *     is incorrectly padded.  Characters that are not in the URL-safe base-64
	 *     alphabet, and are not a plus '+' or slash '/', are discarded prior to the
	 *     padding check.
	 * 
	 *     The alphabet uses '-' instead of '+' and '_' instead of '/'.
	 *     
	 */
	function urlsafe_b64decode(s): Promise<any>
	function urlsafe_b64decode$({ s }): Promise<any>
	function b32encode(s): Promise<any>
	function b32encode$({ s }): Promise<any>
	function b32decode(s, casefold?: boolean, map01?): Promise<any>
	function b32decode$({ s, casefold, map01 }: { s, casefold?, map01?}): Promise<any>
	function b32hexencode(s): Promise<any>
	function b32hexencode$({ s }): Promise<any>
	function b32hexdecode(s, casefold?: boolean): Promise<any>
	function b32hexdecode$({ s, casefold }: { s, casefold?}): Promise<any>

	/**
	 * Encode the bytes-like object s using Base16 and return a bytes object.
	 *     
	 */
	function b16encode(s): Promise<any>
	function b16encode$({ s }): Promise<any>

	/**
	 * Decode the Base16 encoded bytes-like object or ASCII string s.
	 * 
	 *     Optional casefold is a flag specifying whether a lowercase alphabet is
	 *     acceptable as input.  For security purposes, the default is False.
	 * 
	 *     The result is returned as a bytes object.  A binascii.Error is raised if
	 *     s is incorrectly padded or if there are non-alphabet characters present
	 *     in the input.
	 *     
	 */
	function b16decode(s, casefold?: boolean): Promise<any>
	function b16decode$({ s, casefold }: { s, casefold?}): Promise<any>

	/**
	 * Encode bytes-like object b using Ascii85 and return a bytes object.
	 * 
	 *     foldspaces is an optional flag that uses the special short sequence 'y'
	 *     instead of 4 consecutive spaces (ASCII 0x20) as supported by 'btoa'. This
	 *     feature is not supported by the "standard" Adobe encoding.
	 * 
	 *     wrapcol controls whether the output should have newline (b'\n') characters
	 *     added to it. If this is non-zero, each output line will be at most this
	 *     many characters long.
	 * 
	 *     pad controls whether the input is padded to a multiple of 4 before
	 *     encoding. Note that the btoa implementation always pads.
	 * 
	 *     adobe controls whether the encoded byte sequence is framed with <~ and ~>,
	 *     which is used by the Adobe implementation.
	 *     
	 */
	function a85encode(b): Promise<any>
	function a85encode$({ b }): Promise<any>

	/**
	 * Decode the Ascii85 encoded bytes-like object or ASCII string b.
	 * 
	 *     foldspaces is a flag that specifies whether the 'y' short sequence should be
	 *     accepted as shorthand for 4 consecutive spaces (ASCII 0x20). This feature is
	 *     not supported by the "standard" Adobe encoding.
	 * 
	 *     adobe controls whether the input sequence is in Adobe Ascii85 format (i.e.
	 *     is framed with <~ and ~>).
	 * 
	 *     ignorechars should be a byte string containing characters to ignore from the
	 *     input. This should only contain whitespace characters, and by default
	 *     contains all whitespace characters in ASCII.
	 * 
	 *     The result is returned as a bytes object.
	 *     
	 */
	function a85decode(b): Promise<any>
	function a85decode$({ b }): Promise<any>

	/**
	 * Encode bytes-like object b in base85 format and return a bytes object.
	 * 
	 *     If pad is true, the input is padded with b'\0' so its length is a multiple of
	 *     4 bytes before encoding.
	 *     
	 */
	function b85encode(b, pad?: boolean): Promise<any>
	function b85encode$({ b, pad }: { b, pad?}): Promise<any>

	/**
	 * Decode the base85-encoded bytes-like object or ASCII string b
	 * 
	 *     The result is returned as a bytes object.
	 *     
	 */
	function b85decode(b): Promise<any>
	function b85decode$({ b }): Promise<any>

	/**
	 * Encode a file; input and output are binary files.
	 */
	function encode(input, output): Promise<any>
	function encode$({ input, output }): Promise<any>

	/**
	 * Decode a file; input and output are binary files.
	 */
	function decode(input, output): Promise<any>
	function decode$({ input, output }): Promise<any>

	/**
	 * Encode a bytestring into a bytes object containing multiple lines
	 *     of base-64 data.
	 */
	function encodebytes(s): Promise<any>
	function encodebytes$({ s }): Promise<any>

	/**
	 * Decode a bytestring of base-64 data into a bytes object.
	 */
	function decodebytes(s): Promise<any>
	function decodebytes$({ s }): Promise<any>

	/**
	 * Small main program
	 */
	function main(): Promise<any>
	function main$($: {}): Promise<any>
	function test(): Promise<any>
	function test$($: {}): Promise<any>
	let bytes_types: Promise<any>
	let MAXLINESIZE: Promise<any>
	let MAXBINSIZE: Promise<any>
}
declare module codecs {
	var _

	/**
	 *  Open an encoded file using the given mode and return
	 *         a wrapped version providing transparent encoding/decoding.
	 * 
	 *         Note: The wrapped version will only accept the object format
	 *         defined by the codecs, i.e. Unicode objects for most builtin
	 *         codecs. Output is also codec dependent and will usually be
	 *         Unicode as well.
	 * 
	 *         Underlying encoded files are always opened in binary mode.
	 *         The default file mode is 'r', meaning to open the file in read mode.
	 * 
	 *         encoding specifies the encoding which is to be used for the
	 *         file.
	 * 
	 *         errors may be given to define the error handling. It defaults
	 *         to 'strict' which causes ValueErrors to be raised in case an
	 *         encoding error occurs.
	 * 
	 *         buffering has the same meaning as for the builtin open() API.
	 *         It defaults to -1 which means that the default buffer size will
	 *         be used.
	 * 
	 *         The returned wrapped file object provides an extra attribute
	 *         .encoding which allows querying the used encoding. This
	 *         attribute is only available if an encoding was specified as
	 *         parameter.
	 * 
	 *     
	 */
	function open(filename, mode?, encoding?, errors?, buffering?): Promise<any>
	function open$({ filename, mode, encoding, errors, buffering }: { filename, mode?, encoding?, errors?, buffering?}): Promise<any>

	/**
	 *  Return a wrapped version of file which provides transparent
	 *         encoding translation.
	 * 
	 *         Data written to the wrapped file is decoded according
	 *         to the given data_encoding and then encoded to the underlying
	 *         file using file_encoding. The intermediate data type
	 *         will usually be Unicode but depends on the specified codecs.
	 * 
	 *         Bytes read from the file are decoded using file_encoding and then
	 *         passed back to the caller encoded using data_encoding.
	 * 
	 *         If file_encoding is not given, it defaults to data_encoding.
	 * 
	 *         errors may be given to define the error handling. It defaults
	 *         to 'strict' which causes ValueErrors to be raised in case an
	 *         encoding error occurs.
	 * 
	 *         The returned wrapped file object provides two extra attributes
	 *         .data_encoding and .file_encoding which reflect the given
	 *         parameters of the same name. The attributes can be used for
	 *         introspection by Python programs.
	 * 
	 *     
	 */
	function EncodedFile(file, data_encoding, file_encoding?, errors?): Promise<any>
	function EncodedFile$({ file, data_encoding, file_encoding, errors }: { file, data_encoding, file_encoding?, errors?}): Promise<any>

	/**
	 *  Lookup up the codec for the given encoding and return
	 *         its encoder function.
	 * 
	 *         Raises a LookupError in case the encoding cannot be found.
	 * 
	 *     
	 */
	function getencoder(encoding): Promise<any>
	function getencoder$({ encoding }): Promise<any>

	/**
	 *  Lookup up the codec for the given encoding and return
	 *         its decoder function.
	 * 
	 *         Raises a LookupError in case the encoding cannot be found.
	 * 
	 *     
	 */
	function getdecoder(encoding): Promise<any>
	function getdecoder$({ encoding }): Promise<any>

	/**
	 *  Lookup up the codec for the given encoding and return
	 *         its IncrementalEncoder class or factory function.
	 * 
	 *         Raises a LookupError in case the encoding cannot be found
	 *         or the codecs doesn't provide an incremental encoder.
	 * 
	 *     
	 */
	function getincrementalencoder(encoding): Promise<any>
	function getincrementalencoder$({ encoding }): Promise<any>

	/**
	 *  Lookup up the codec for the given encoding and return
	 *         its IncrementalDecoder class or factory function.
	 * 
	 *         Raises a LookupError in case the encoding cannot be found
	 *         or the codecs doesn't provide an incremental decoder.
	 * 
	 *     
	 */
	function getincrementaldecoder(encoding): Promise<any>
	function getincrementaldecoder$({ encoding }): Promise<any>

	/**
	 *  Lookup up the codec for the given encoding and return
	 *         its StreamReader class or factory function.
	 * 
	 *         Raises a LookupError in case the encoding cannot be found.
	 * 
	 *     
	 */
	function getreader(encoding): Promise<any>
	function getreader$({ encoding }): Promise<any>

	/**
	 *  Lookup up the codec for the given encoding and return
	 *         its StreamWriter class or factory function.
	 * 
	 *         Raises a LookupError in case the encoding cannot be found.
	 * 
	 *     
	 */
	function getwriter(encoding): Promise<any>
	function getwriter$({ encoding }): Promise<any>

	/**
	 * 
	 *     Encoding iterator.
	 * 
	 *     Encodes the input strings from the iterator using an IncrementalEncoder.
	 * 
	 *     errors and kwargs are passed through to the IncrementalEncoder
	 *     constructor.
	 *     
	 */
	function iterencode(iterator, encoding, errors?): Promise<any>
	function iterencode$({ iterator, encoding, errors }: { iterator, encoding, errors?}): Promise<any>

	/**
	 * 
	 *     Decoding iterator.
	 * 
	 *     Decodes the input strings from the iterator using an IncrementalDecoder.
	 * 
	 *     errors and kwargs are passed through to the IncrementalDecoder
	 *     constructor.
	 *     
	 */
	function iterdecode(iterator, encoding, errors?): Promise<any>
	function iterdecode$({ iterator, encoding, errors }: { iterator, encoding, errors?}): Promise<any>

	/**
	 *  make_identity_dict(rng) -> dict
	 * 
	 *         Return a dictionary where elements of the rng sequence are
	 *         mapped to themselves.
	 * 
	 *     
	 */
	function make_identity_dict(rng): Promise<any>
	function make_identity_dict$({ rng }): Promise<any>

	/**
	 *  Creates an encoding map from a decoding map.
	 * 
	 *         If a target mapping in the decoding map occurs multiple
	 *         times, then that target is mapped to None (undefined mapping),
	 *         causing an exception when encountered by the charmap codec
	 *         during translation.
	 * 
	 *         One example where this happens is cp875.py which decodes
	 *         multiple character to \u001a.
	 * 
	 *     
	 */
	function make_encoding_map(decoding_map): Promise<any>
	function make_encoding_map$({ decoding_map }): Promise<any>

	/**
	 * Codec details when looking up the codec registry
	 */
	interface ICodecInfo {
	}

	/**
	 *  Defines the interface for stateless encoders/decoders.
	 * 
	 *         The .encode()/.decode() methods may use different error
	 *         handling schemes by providing the errors argument. These
	 *         string values are predefined:
	 * 
	 *          'strict' - raise a ValueError error (or a subclass)
	 *          'ignore' - ignore the character and continue with the next
	 *          'replace' - replace with a suitable replacement character;
	 *                     Python will use the official U+FFFD REPLACEMENT
	 *                     CHARACTER for the builtin Unicode codecs on
	 *                     decoding and '?' on encoding.
	 *          'surrogateescape' - replace with private code points U+DCnn.
	 *          'xmlcharrefreplace' - Replace with the appropriate XML
	 *                                character reference (only for encoding).
	 *          'backslashreplace'  - Replace with backslashed escape sequences.
	 *          'namereplace'       - Replace with \N{...} escape sequences
	 *                                (only for encoding).
	 * 
	 *         The set of allowed values can be extended via register_error.
	 * 
	 *     
	 */
	interface ICodec {

		/**
		 *  Encodes the object input and returns a tuple (output
		 *             object, length consumed).
		 * 
		 *             errors defines the error handling to apply. It defaults to
		 *             'strict' handling.
		 * 
		 *             The method may not store state in the Codec instance. Use
		 *             StreamWriter for codecs which have to keep state in order to
		 *             make encoding efficient.
		 * 
		 *             The encoder must be able to handle zero length input and
		 *             return an empty object of the output object type in this
		 *             situation.
		 * 
		 *         
		 */
		encode(input, errors?): Promise<any>
		encode$({ input, errors }: { input, errors?}): Promise<any>

		/**
		 *  Decodes the object input and returns a tuple (output
		 *             object, length consumed).
		 * 
		 *             input must be an object which provides the bf_getreadbuf
		 *             buffer slot. Python strings, buffer objects and memory
		 *             mapped files are examples of objects providing this slot.
		 * 
		 *             errors defines the error handling to apply. It defaults to
		 *             'strict' handling.
		 * 
		 *             The method may not store state in the Codec instance. Use
		 *             StreamReader for codecs which have to keep state in order to
		 *             make decoding efficient.
		 * 
		 *             The decoder must be able to handle zero length input and
		 *             return an empty object of the output object type in this
		 *             situation.
		 * 
		 *         
		 */
		decode(input, errors?): Promise<any>
		decode$({ input, errors }: { input, errors?}): Promise<any>
	}

	/**
	 * 
	 *     An IncrementalEncoder encodes an input in multiple steps. The input can
	 *     be passed piece by piece to the encode() method. The IncrementalEncoder
	 *     remembers the state of the encoding process between calls to encode().
	 *     
	 */

	/**
	 * 
	 *         Creates an IncrementalEncoder instance.
	 * 
	 *         The IncrementalEncoder may use different error handling schemes by
	 *         providing the errors keyword argument. See the module docstring
	 *         for a list of possible values.
	 *         
	 */
	function IncrementalEncoder(errors?): Promise<IIncrementalEncoder>
	function IncrementalEncoder$({ errors }: { errors?}): Promise<IIncrementalEncoder>
	interface IIncrementalEncoder {

		/**
		 * 
		 *         Encodes input and returns the resulting object.
		 *         
		 */
		encode(input, final?: boolean): Promise<any>
		encode$({ input, final }: { input, final?}): Promise<any>

		/**
		 * 
		 *         Resets the encoder to the initial state.
		 *         
		 */
		reset(): Promise<any>
		reset$($: {}): Promise<any>

		/**
		 * 
		 *         Return the current state of the encoder.
		 *         
		 */
		getstate(): Promise<any>
		getstate$($: {}): Promise<any>

		/**
		 * 
		 *         Set the current state of the encoder. state must have been
		 *         returned by getstate().
		 *         
		 */
		setstate(state): Promise<any>
		setstate$({ state }): Promise<any>
	}

	/**
	 * 
	 *     This subclass of IncrementalEncoder can be used as the baseclass for an
	 *     incremental encoder if the encoder must keep some of the output in a
	 *     buffer between calls to encode().
	 *     
	 */
	function BufferedIncrementalEncoder(errors?): Promise<IBufferedIncrementalEncoder>
	function BufferedIncrementalEncoder$({ errors }: { errors?}): Promise<IBufferedIncrementalEncoder>
	interface IBufferedIncrementalEncoder extends IIncrementalEncoder {
		encode(input, final?: boolean): Promise<any>
		encode$({ input, final }: { input, final?}): Promise<any>
		reset(): Promise<any>
		reset$($: {}): Promise<any>
		getstate(): Promise<any>
		getstate$($: {}): Promise<any>
		setstate(state): Promise<any>
		setstate$({ state }): Promise<any>
	}

	/**
	 * 
	 *     An IncrementalDecoder decodes an input in multiple steps. The input can
	 *     be passed piece by piece to the decode() method. The IncrementalDecoder
	 *     remembers the state of the decoding process between calls to decode().
	 *     
	 */

	/**
	 * 
	 *         Create an IncrementalDecoder instance.
	 * 
	 *         The IncrementalDecoder may use different error handling schemes by
	 *         providing the errors keyword argument. See the module docstring
	 *         for a list of possible values.
	 *         
	 */
	function IncrementalDecoder(errors?): Promise<IIncrementalDecoder>
	function IncrementalDecoder$({ errors }: { errors?}): Promise<IIncrementalDecoder>
	interface IIncrementalDecoder {

		/**
		 * 
		 *         Decode input and returns the resulting object.
		 *         
		 */
		decode(input, final?: boolean): Promise<any>
		decode$({ input, final }: { input, final?}): Promise<any>

		/**
		 * 
		 *         Reset the decoder to the initial state.
		 *         
		 */
		reset(): Promise<any>
		reset$($: {}): Promise<any>

		/**
		 * 
		 *         Return the current state of the decoder.
		 * 
		 *         This must be a (buffered_input, additional_state_info) tuple.
		 *         buffered_input must be a bytes object containing bytes that
		 *         were passed to decode() that have not yet been converted.
		 *         additional_state_info must be a non-negative integer
		 *         representing the state of the decoder WITHOUT yet having
		 *         processed the contents of buffered_input.  In the initial state
		 *         and after reset(), getstate() must return (b"", 0).
		 *         
		 */
		getstate(): Promise<any>
		getstate$($: {}): Promise<any>

		/**
		 * 
		 *         Set the current state of the decoder.
		 * 
		 *         state must have been returned by getstate().  The effect of
		 *         setstate((b"", 0)) must be equivalent to reset().
		 *         
		 */
		setstate(state): Promise<any>
		setstate$({ state }): Promise<any>
	}

	/**
	 * 
	 *     This subclass of IncrementalDecoder can be used as the baseclass for an
	 *     incremental decoder if the decoder must be able to handle incomplete
	 *     byte sequences.
	 *     
	 */
	function BufferedIncrementalDecoder(errors?): Promise<IBufferedIncrementalDecoder>
	function BufferedIncrementalDecoder$({ errors }: { errors?}): Promise<IBufferedIncrementalDecoder>
	interface IBufferedIncrementalDecoder extends IIncrementalDecoder {
		decode(input, final?: boolean): Promise<any>
		decode$({ input, final }: { input, final?}): Promise<any>
		reset(): Promise<any>
		reset$($: {}): Promise<any>
		getstate(): Promise<any>
		getstate$($: {}): Promise<any>
		setstate(state): Promise<any>
		setstate$({ state }): Promise<any>
	}

	/**
	 *  Creates a StreamWriter instance.
	 * 
	 *             stream must be a file-like object open for writing.
	 * 
	 *             The StreamWriter may use different error handling
	 *             schemes by providing the errors keyword argument. These
	 *             parameters are predefined:
	 * 
	 *              'strict' - raise a ValueError (or a subclass)
	 *              'ignore' - ignore the character and continue with the next
	 *              'replace'- replace with a suitable replacement character
	 *              'xmlcharrefreplace' - Replace with the appropriate XML
	 *                                    character reference.
	 *              'backslashreplace'  - Replace with backslashed escape
	 *                                    sequences.
	 *              'namereplace'       - Replace with \N{...} escape sequences.
	 * 
	 *             The set of allowed parameter values can be extended via
	 *             register_error.
	 *         
	 */
	function StreamWriter(stream, errors?): Promise<IStreamWriter>
	function StreamWriter$({ stream, errors }: { stream, errors?}): Promise<IStreamWriter>
	interface IStreamWriter extends ICodec {

		/**
		 *  Writes the object's contents encoded to self.stream.
		 *         
		 */
		write(object): Promise<any>
		write$({ object }): Promise<any>

		/**
		 *  Writes the concatenated list of strings to the stream
		 *             using .write().
		 *         
		 */
		writelines(list): Promise<any>
		writelines$({ list }): Promise<any>

		/**
		 *  Resets the codec buffers used for keeping internal state.
		 * 
		 *             Calling this method should ensure that the data on the
		 *             output is put into a clean state, that allows appending
		 *             of new fresh data without having to rescan the whole
		 *             stream to recover state.
		 * 
		 *         
		 */
		reset(): Promise<any>
		reset$($: {}): Promise<any>
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
	}

	/**
	 *  Creates a StreamReader instance.
	 * 
	 *             stream must be a file-like object open for reading.
	 * 
	 *             The StreamReader may use different error handling
	 *             schemes by providing the errors keyword argument. These
	 *             parameters are predefined:
	 * 
	 *              'strict' - raise a ValueError (or a subclass)
	 *              'ignore' - ignore the character and continue with the next
	 *              'replace'- replace with a suitable replacement character
	 *              'backslashreplace' - Replace with backslashed escape sequences;
	 * 
	 *             The set of allowed parameter values can be extended via
	 *             register_error.
	 *         
	 */
	function StreamReader(stream, errors?): Promise<IStreamReader>
	function StreamReader$({ stream, errors }: { stream, errors?}): Promise<IStreamReader>
	interface IStreamReader extends ICodec {
		decode(input, errors?): Promise<any>
		decode$({ input, errors }: { input, errors?}): Promise<any>

		/**
		 *  Decodes data from the stream self.stream and returns the
		 *             resulting object.
		 * 
		 *             chars indicates the number of decoded code points or bytes to
		 *             return. read() will never return more data than requested,
		 *             but it might return less, if there is not enough available.
		 * 
		 *             size indicates the approximate maximum number of decoded
		 *             bytes or code points to read for decoding. The decoder
		 *             can modify this setting as appropriate. The default value
		 *             -1 indicates to read and decode as much as possible.  size
		 *             is intended to prevent having to decode huge files in one
		 *             step.
		 * 
		 *             If firstline is true, and a UnicodeDecodeError happens
		 *             after the first line terminator in the input only the first line
		 *             will be returned, the rest of the input will be kept until the
		 *             next call to read().
		 * 
		 *             The method should use a greedy read strategy, meaning that
		 *             it should read as much data as is allowed within the
		 *             definition of the encoding and the given size, e.g.  if
		 *             optional encoding endings or state markers are available
		 *             on the stream, these should be read too.
		 *         
		 */
		read(size?, chars?, firstline?: boolean): Promise<any>
		read$({ size, chars, firstline }: { size?, chars?, firstline?}): Promise<any>

		/**
		 *  Read one line from the input stream and return the
		 *             decoded data.
		 * 
		 *             size, if given, is passed as size argument to the
		 *             read() method.
		 * 
		 *         
		 */
		readline(size?, keepends?: boolean): Promise<any>
		readline$({ size, keepends }: { size?, keepends?}): Promise<any>

		/**
		 *  Read all lines available on the input stream
		 *             and return them as a list.
		 * 
		 *             Line breaks are implemented using the codec's decoder
		 *             method and are included in the list entries.
		 * 
		 *             sizehint, if given, is ignored since there is no efficient
		 *             way to finding the true end-of-line.
		 * 
		 *         
		 */
		readlines(sizehint?, keepends?: boolean): Promise<any>
		readlines$({ sizehint, keepends }: { sizehint?, keepends?}): Promise<any>

		/**
		 *  Resets the codec buffers used for keeping internal state.
		 * 
		 *             Note that no stream repositioning should take place.
		 *             This method is primarily intended to be able to recover
		 *             from decoding errors.
		 * 
		 *         
		 */
		reset(): Promise<any>
		reset$($: {}): Promise<any>

		/**
		 *  Set the input stream's current position.
		 * 
		 *             Resets the codec buffers used for keeping state.
		 *         
		 */
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
		charbuffertype
	}

	/**
	 *  StreamReaderWriter instances allow wrapping streams which
	 *         work in both read and write modes.
	 * 
	 *         The design is such that one can use the factory functions
	 *         returned by the codec.lookup() function to construct the
	 *         instance.
	 * 
	 *     
	 */

	/**
	 *  Creates a StreamReaderWriter instance.
	 * 
	 *             stream must be a Stream-like object.
	 * 
	 *             Reader, Writer must be factory functions or classes
	 *             providing the StreamReader, StreamWriter interface resp.
	 * 
	 *             Error handling is done in the same way as defined for the
	 *             StreamWriter/Readers.
	 * 
	 *         
	 */
	function StreamReaderWriter(stream, Reader, Writer, errors?): Promise<IStreamReaderWriter>
	function StreamReaderWriter$({ stream, Reader, Writer, errors }: { stream, Reader, Writer, errors?}): Promise<IStreamReaderWriter>
	interface IStreamReaderWriter {
		read(size?): Promise<any>
		read$({ size }: { size?}): Promise<any>
		readline(size?): Promise<any>
		readline$({ size }: { size?}): Promise<any>
		readlines(sizehint?): Promise<any>
		readlines$({ sizehint }: { sizehint?}): Promise<any>
		write(data): Promise<any>
		write$({ data }): Promise<any>
		writelines(list): Promise<any>
		writelines$({ list }): Promise<any>
		reset(): Promise<any>
		reset$($: {}): Promise<any>
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
		encoding
	}

	/**
	 *  StreamRecoder instances translate data from one encoding to another.
	 * 
	 *         They use the complete set of APIs returned by the
	 *         codecs.lookup() function to implement their task.
	 * 
	 *         Data written to the StreamRecoder is first decoded into an
	 *         intermediate format (depending on the "decode" codec) and then
	 *         written to the underlying stream using an instance of the provided
	 *         Writer class.
	 * 
	 *         In the other direction, data is read from the underlying stream using
	 *         a Reader instance and then encoded and returned to the caller.
	 * 
	 *     
	 */

	/**
	 *  Creates a StreamRecoder instance which implements a two-way
	 *             conversion: encode and decode work on the frontend (the
	 *             data visible to .read() and .write()) while Reader and Writer
	 *             work on the backend (the data in stream).
	 * 
	 *             You can use these objects to do transparent
	 *             transcodings from e.g. latin-1 to utf-8 and back.
	 * 
	 *             stream must be a file-like object.
	 * 
	 *             encode and decode must adhere to the Codec interface; Reader and
	 *             Writer must be factory functions or classes providing the
	 *             StreamReader and StreamWriter interfaces resp.
	 * 
	 *             Error handling is done in the same way as defined for the
	 *             StreamWriter/Readers.
	 * 
	 *         
	 */
	function StreamRecoder(stream, encode, decode, Reader, Writer, errors?): Promise<IStreamRecoder>
	function StreamRecoder$({ stream, encode, decode, Reader, Writer, errors }: { stream, encode, decode, Reader, Writer, errors?}): Promise<IStreamRecoder>
	interface IStreamRecoder {
		read(size?): Promise<any>
		read$({ size }: { size?}): Promise<any>
		readline(size?): Promise<any>
		readline$({ size }: { size?}): Promise<any>
		readlines(sizehint?): Promise<any>
		readlines$({ sizehint }: { sizehint?}): Promise<any>
		write(data): Promise<any>
		write$({ data }): Promise<any>
		writelines(list): Promise<any>
		writelines$({ list }): Promise<any>
		reset(): Promise<any>
		reset$($: {}): Promise<any>
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
		data_encoding
		file_encoding
	}
	let BOM_UTF8: Promise<any>
	let BOM_LE: Promise<any>
	let BOM_UTF16_LE: Promise<any>
	let BOM_BE: Promise<any>
	let BOM_UTF16_BE: Promise<any>
	let BOM_UTF32_LE: Promise<any>
	let BOM_UTF32_BE: Promise<any>
	let BOM: Promise<any>
	let BOM_UTF16: Promise<any>
	let BOM_UTF32: Promise<any>
	let BOM32_LE: Promise<any>
	let BOM32_BE: Promise<any>
	let BOM64_LE: Promise<any>
	let BOM64_BE: Promise<any>
	let strict_errors: Promise<any>
	let ignore_errors: Promise<any>
	let replace_errors: Promise<any>
	let xmlcharrefreplace_errors: Promise<any>
	let backslashreplace_errors: Promise<any>
	let namereplace_errors: Promise<any>
}
declare module colorsys {
	var _
	function rgb_to_yiq(r, g, b): Promise<any>
	function rgb_to_yiq$({ r, g, b }): Promise<any>
	function yiq_to_rgb(y, i, q): Promise<any>
	function yiq_to_rgb$({ y, i, q }): Promise<any>
	function rgb_to_hls(r, g, b): Promise<any>
	function rgb_to_hls$({ r, g, b }): Promise<any>
	function hls_to_rgb(h, l, s): Promise<any>
	function hls_to_rgb$({ h, l, s }): Promise<any>
	function rgb_to_hsv(r, g, b): Promise<any>
	function rgb_to_hsv$({ r, g, b }): Promise<any>
	function hsv_to_rgb(h, s, v): Promise<any>
	function hsv_to_rgb$({ h, s, v }): Promise<any>
	let ONE_THIRD: Promise<any>
	let ONE_SIXTH: Promise<any>
	let TWO_THIRD: Promise<any>
}
declare module crypt {
	var _

	/**
	 * Generate a salt for the specified method.
	 * 
	 *     If not specified, the strongest available method will be used.
	 * 
	 *     
	 */
	function mksalt(method?): Promise<any>
	function mksalt$({ method }: { method?}): Promise<any>

	/**
	 * Return a string representing the one-way hash of a password, with a salt
	 *     prepended.
	 * 
	 *     If ``salt`` is not specified or is ``None``, the strongest
	 *     available method will be selected and a salt generated.  Otherwise,
	 *     ``salt`` may be one of the ``crypt.METHOD_*`` values, or a string as
	 *     returned by ``crypt.mksalt()``.
	 * 
	 *     
	 */
	function crypt(word, salt?): Promise<any>
	function crypt$({ word, salt }: { word, salt?}): Promise<any>

	/**
	 * Class representing a salt method per the Modular Crypt Format or the
	 *     legacy 2-character crypt method.
	 */
	interface I_Method {
	}
	let methods: Promise<any>
}
declare module decimal {
	var _
}
declare module email {
	module base64mime {
		var _

		/**
		 * Return the length of s when it is encoded with base64.
		 */
		function header_length(bytearray): Promise<any>
		function header_length$({ bytearray }): Promise<any>

		/**
		 * Encode a single header line with Base64 encoding in a given charset.
		 * 
		 *     charset names the character set to use to encode the header.  It defaults
		 *     to iso-8859-1.  Base64 encoding is defined in RFC 2045.
		 *     
		 */
		function header_encode(header_bytes, charset?): Promise<any>
		function header_encode$({ header_bytes, charset }: { header_bytes, charset?}): Promise<any>

		/**
		 * Encode a string with base64.
		 * 
		 *     Each line will be wrapped at, at most, maxlinelen characters (defaults to
		 *     76 characters).
		 * 
		 *     Each line of encoded text will end with eol, which defaults to "\n".  Set
		 *     this to "\r\n" if you will be using the result of this function directly
		 *     in an email.
		 *     
		 */
		function body_encode(s, maxlinelen?, eol?): Promise<any>
		function body_encode$({ s, maxlinelen, eol }: { s, maxlinelen?, eol?}): Promise<any>

		/**
		 * Decode a raw base64 string, returning a bytes object.
		 * 
		 *     This function does not parse a full MIME header value encoded with
		 *     base64 (like =?iso-8859-1?b?bmloISBuaWgh?=) -- please use the high
		 *     level email.header class for that functionality.
		 *     
		 */
		function decode(string): Promise<any>
		function decode$({ string }): Promise<any>
		let CRLF: Promise<any>
		let NL: Promise<any>
		let EMPTYSTRING: Promise<any>
		let MISC_LEN: Promise<any>
		let body_decode: Promise<any>
		let decodestring: Promise<any>
	}
}
declare module encodings {
	module base64_codec {
		var _
		function base64_encode(input, errors?): Promise<any>
		function base64_encode$({ input, errors }: { input, errors?}): Promise<any>
		function base64_decode(input, errors?): Promise<any>
		function base64_decode$({ input, errors }: { input, errors?}): Promise<any>
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
			charbuffertype
		}
		interface IStreamReader extends ICodec {
		}
	}
	module bz2_codec {
		var _
		function bz2_encode(input, errors?): Promise<any>
		function bz2_encode$({ input, errors }: { input, errors?}): Promise<any>
		function bz2_decode(input, errors?): Promise<any>
		function bz2_decode$({ input, errors }: { input, errors?}): Promise<any>
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		function IncrementalEncoder(errors?): Promise<IIncrementalEncoder>
		function IncrementalEncoder$({ errors }: { errors?}): Promise<IIncrementalEncoder>
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
			reset(): Promise<any>
			reset$($: {}): Promise<any>
		}
		function IncrementalDecoder(errors?): Promise<IIncrementalDecoder>
		function IncrementalDecoder$({ errors }: { errors?}): Promise<IIncrementalDecoder>
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
			reset(): Promise<any>
			reset$($: {}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
			charbuffertype
		}
		interface IStreamReader extends ICodec {
		}
	}
	module hex_codec {
		var _
		function hex_encode(input, errors?): Promise<any>
		function hex_encode$({ input, errors }: { input, errors?}): Promise<any>
		function hex_decode(input, errors?): Promise<any>
		function hex_decode$({ input, errors }: { input, errors?}): Promise<any>
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
			charbuffertype
		}
		interface IStreamReader extends ICodec {
		}
	}
	module palmos {
		var _
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
		}
		interface IStreamReader extends ICodec {
		}
		let decoding_table: Promise<any>
		let encoding_table: Promise<any>
	}
	module quopri_codec {
		var _
		function quopri_encode(input, errors?): Promise<any>
		function quopri_encode$({ input, errors }: { input, errors?}): Promise<any>
		function quopri_decode(input, errors?): Promise<any>
		function quopri_decode$({ input, errors }: { input, errors?}): Promise<any>
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
			charbuffertype
		}
		interface IStreamReader extends ICodec {
		}
	}
	module uu_codec {
		var _
		function uu_encode(input, errors?, filename?, mode?): Promise<any>
		function uu_encode$({ input, errors, filename, mode }: { input, errors?, filename?, mode?}): Promise<any>
		function uu_decode(input, errors?): Promise<any>
		function uu_decode$({ input, errors }: { input, errors?}): Promise<any>
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
			charbuffertype
		}
		interface IStreamReader extends ICodec {
		}
	}
	module zlib_codec {
		var _
		function zlib_encode(input, errors?): Promise<any>
		function zlib_encode$({ input, errors }: { input, errors?}): Promise<any>
		function zlib_decode(input, errors?): Promise<any>
		function zlib_decode$({ input, errors }: { input, errors?}): Promise<any>
		function getregentry(): Promise<any>
		function getregentry$($: {}): Promise<any>
		interface ICodec {
			encode(input, errors?): Promise<any>
			encode$({ input, errors }: { input, errors?}): Promise<any>
			decode(input, errors?): Promise<any>
			decode$({ input, errors }: { input, errors?}): Promise<any>
		}
		function IncrementalEncoder(errors?): Promise<IIncrementalEncoder>
		function IncrementalEncoder$({ errors }: { errors?}): Promise<IIncrementalEncoder>
		interface IIncrementalEncoder {
			encode(input, final?: boolean): Promise<any>
			encode$({ input, final }: { input, final?}): Promise<any>
			reset(): Promise<any>
			reset$($: {}): Promise<any>
		}
		function IncrementalDecoder(errors?): Promise<IIncrementalDecoder>
		function IncrementalDecoder$({ errors }: { errors?}): Promise<IIncrementalDecoder>
		interface IIncrementalDecoder {
			decode(input, final?: boolean): Promise<any>
			decode$({ input, final }: { input, final?}): Promise<any>
			reset(): Promise<any>
			reset$($: {}): Promise<any>
		}
		interface IStreamWriter extends ICodec {
			charbuffertype
		}
		interface IStreamReader extends ICodec {
		}
	}
}
declare module export {
	var _
	function export_json(tree, pretty_print ?: boolean): Promise < any >
	function export_json$({ tree, pretty_print }: { tree, pretty_print?}): Promise<any>
	function export_dict(tree): Promise<any>
function export_dict$({ tree }): Promise<any>
interface IDictExportVisitor {
	visit(node): Promise<any>
	visit$({ node }): Promise<any>
	default_visit(node): Promise<any>
	default_visit$({ node }): Promise<any>
	default_visit_field(val): Promise<any>
	default_visit_field$({ val }): Promise<any>
	visit_str(val): Promise<any>
	visit_str$({ val }): Promise<any>
	visit_Bytes(val): Promise<any>
	visit_Bytes$({ val }): Promise<any>
	visit_NoneType(val): Promise<any>
	visit_NoneType$({ val }): Promise<any>
	visit_field_NameConstant_value(val): Promise<any>
	visit_field_NameConstant_value$({ val }): Promise<any>
	visit_field_Num_n(val): Promise<any>
	visit_field_Num_n$({ val }): Promise<any>
	ast_type_field
}
}
declare module gzip {
	var _

	/**
	 * Open a gzip-compressed file in binary or text mode.
	 * 
	 *     The filename argument can be an actual filename (a str or bytes object), or
	 *     an existing file object to read from or write to.
	 * 
	 *     The mode argument can be "r", "rb", "w", "wb", "x", "xb", "a" or "ab" for
	 *     binary mode, or "rt", "wt", "xt" or "at" for text mode. The default mode is
	 *     "rb", and the default compresslevel is 9.
	 * 
	 *     For binary mode, this function is equivalent to the GzipFile constructor:
	 *     GzipFile(filename, mode, compresslevel). In this case, the encoding, errors
	 *     and newline arguments must not be provided.
	 * 
	 *     For text mode, a GzipFile object is created, and wrapped in an
	 *     io.TextIOWrapper instance with the specified encoding, error handling
	 *     behavior, and line ending(s).
	 * 
	 *     
	 */
	function open(filename, mode?, compresslevel?, encoding?, errors?, newline?): Promise<any>
	function open$({ filename, mode, compresslevel, encoding, errors, newline }: { filename, mode?, compresslevel?, encoding?, errors?, newline?}): Promise<any>
	function write32u(output, value): Promise<any>
	function write32u$({ output, value }): Promise<any>

	/**
	 * Compress data in one shot and return the compressed string.
	 *     Optional argument is the compression level, in range of 0-9.
	 *     
	 */
	function compress(data, compresslevel?): Promise<any>
	function compress$({ data, compresslevel }: { data, compresslevel?}): Promise<any>

	/**
	 * Decompress a gzip compressed string in one shot.
	 *     Return the decompressed string.
	 *     
	 */
	function decompress(data): Promise<any>
	function decompress$({ data }): Promise<any>
	function main(): Promise<any>
	function main$($: {}): Promise<any>

	/**
	 * Minimal read-only file object that prepends a string to the contents
	 *     of an actual file. Shouldn't be used outside of gzip.py, as it lacks
	 *     essential functionality.
	 */
	interface I_PaddedFile {
		read(size): Promise<any>
		read$({ size }): Promise<any>
		prepend(prepend?): Promise<any>
		prepend$({ prepend }: { prepend?}): Promise<any>
		seek(off): Promise<any>
		seek$({ off }): Promise<any>
		seekable(): Promise<any>
		seekable$($: {}): Promise<any>
	}

	/**
	 * Exception raised in some cases for invalid gzip files.
	 */
	interface IBadGzipFile {
	}

	/**
	 * The GzipFile class simulates most of the methods of a file object with
	 *     the exception of the truncate() method.
	 * 
	 *     This class only supports opening files in binary mode. If you need to open a
	 *     compressed file in text mode, use the gzip.open() function.
	 * 
	 *     
	 */

	/**
	 * Constructor for the GzipFile class.
	 * 
	 *         At least one of fileobj and filename must be given a
	 *         non-trivial value.
	 * 
	 *         The new class instance is based on fileobj, which can be a regular
	 *         file, an io.BytesIO object, or any other object which simulates a file.
	 *         It defaults to None, in which case filename is opened to provide
	 *         a file object.
	 * 
	 *         When fileobj is not None, the filename argument is only used to be
	 *         included in the gzip file header, which may include the original
	 *         filename of the uncompressed file.  It defaults to the filename of
	 *         fileobj, if discernible; otherwise, it defaults to the empty string,
	 *         and in this case the original filename is not included in the header.
	 * 
	 *         The mode argument can be any of 'r', 'rb', 'a', 'ab', 'w', 'wb', 'x', or
	 *         'xb' depending on whether the file will be read or written.  The default
	 *         is the mode of fileobj if discernible; otherwise, the default is 'rb'.
	 *         A mode of 'r' is equivalent to one of 'rb', and similarly for 'w' and
	 *         'wb', 'a' and 'ab', and 'x' and 'xb'.
	 * 
	 *         The compresslevel argument is an integer from 0 to 9 controlling the
	 *         level of compression; 1 is fastest and produces the least compression,
	 *         and 9 is slowest and produces the most compression. 0 is no compression
	 *         at all. The default is 9.
	 * 
	 *         The mtime argument is an optional numeric timestamp to be written
	 *         to the last modification time field in the stream when compressing.
	 *         If omitted or None, the current time is used.
	 * 
	 *         
	 */
	function GzipFile(filename?, mode?, compresslevel?, fileobj?, mtime?): Promise<IGzipFile>
	function GzipFile$({ filename, mode, compresslevel, fileobj, mtime }: { filename?, mode?, compresslevel?, fileobj?, mtime?}): Promise<IGzipFile>
	interface IGzipFile {
		filename(): Promise<any>
		filename$($: {}): Promise<any>

		/**
		 * Last modification time read from stream, or None
		 */
		mtime(): Promise<any>
		mtime$($: {}): Promise<any>
		write(data): Promise<any>
		write$({ data }): Promise<any>
		read(size?): Promise<any>
		read$({ size }: { size?}): Promise<any>

		/**
		 * Implements BufferedIOBase.read1()
		 * 
		 *         Reads up to a buffer's worth of data if size is negative.
		 */
		read1(size?): Promise<any>
		read1$({ size }: { size?}): Promise<any>
		peek(n): Promise<any>
		peek$({ n }): Promise<any>
		closed(): Promise<any>
		closed$($: {}): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
		flush(zlib_mode?): Promise<any>
		flush$({ zlib_mode }: { zlib_mode?}): Promise<any>

		/**
		 * Invoke the underlying file object's fileno() method.
		 * 
		 *         This will raise AttributeError if the underlying file object
		 *         doesn't support fileno().
		 *         
		 */
		fileno(): Promise<any>
		fileno$($: {}): Promise<any>

		/**
		 * Return the uncompressed stream file position indicator to the
		 *         beginning of the file
		 */
		rewind(): Promise<any>
		rewind$($: {}): Promise<any>
		readable(): Promise<any>
		readable$($: {}): Promise<any>
		writable(): Promise<any>
		writable$($: {}): Promise<any>
		seekable(): Promise<any>
		seekable$($: {}): Promise<any>
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
		readline(size?): Promise<any>
		readline$({ size }: { size?}): Promise<any>
		myfileobj
	}
	interface I_GzipReader {
		read(size?): Promise<any>
		read$({ size }: { size?}): Promise<any>
	}
}
declare module hashlib {
	var _
	let algorithms_guaranteed: Promise<any>
	let algorithms_available: Promise<any>
	let new$: Promise<any>
}
declare module idlelib {
	module codecontext {
		var _

		/**
		 * Extract the beginning whitespace and first word from codeline.
		 */
		function get_spaces_firstword(codeline, c?): Promise<any>
		function get_spaces_firstword$({ codeline, c }: { codeline, c?}): Promise<any>

		/**
		 * Return tuple of (line indent value, codeline, block start keyword).
		 * 
		 *     The indentation of empty lines (or comment lines) is INFINITY.
		 *     If the line does not start a block, the keyword value is False.
		 *     
		 */
		function get_line_info(codeline): Promise<any>
		function get_line_info$({ codeline }): Promise<any>

		/**
		 * Display block context above the edit window.
		 */

		/**
		 * Initialize settings for context block.
		 * 
		 *         editwin is the Editor window for the context block.
		 *         self.text is the editor window text widget.
		 * 
		 *         self.context displays the code context text above the editor text.
		 *           Initially None, it is toggled via <<toggle-code-context>>.
		 *         self.topvisible is the number of the top text line displayed.
		 *         self.info is a list of (line number, indent level, line text,
		 *           block keyword) tuples for the block structure above topvisible.
		 *           self.info[0] is initialized with a 'dummy' line which
		 *           starts the toplevel 'block' of the module.
		 * 
		 *         self.t1 and self.t2 are two timer events on the editor text widget to
		 *           monitor for changes to the context text or editor font.
		 *         
		 */
		function CodeContext(editwin): Promise<ICodeContext>
		function CodeContext$({ editwin }): Promise<ICodeContext>
		interface ICodeContext {

			/**
			 * Load class variables from config.
			 */
			reload(): Promise<any>
			reload$($: {}): Promise<any>

			/**
			 * Toggle code context display.
			 * 
			 *         If self.context doesn't exist, create it to match the size of the editor
			 *         window text (toggle on).  If it does exist, destroy it (toggle off).
			 *         Return 'break' to complete the processing of the binding.
			 *         
			 */
			toggle_code_context_event(event?): Promise<any>
			toggle_code_context_event$({ event }: { event?}): Promise<any>

			/**
			 * Return a list of block line tuples and the 'last' indent.
			 * 
			 *         The tuple fields are (linenum, indent, text, opener).
			 *         The list represents header lines from new_topvisible back to
			 *         stopline with successively shorter indents > stopindent.
			 *         The list is returned ordered by line number.
			 *         Last indent returned is the smallest indent observed.
			 *         
			 */
			get_context(new_topvisible, stopline?, stopindent?): Promise<any>
			get_context$({ new_topvisible, stopline, stopindent }: { new_topvisible, stopline?, stopindent?}): Promise<any>

			/**
			 * Update context information and lines visible in the context pane.
			 * 
			 *         No update is done if the text hasn't been scrolled.  If the text
			 *         was scrolled, the lines that should be shown in the context will
			 *         be retrieved and the context area will be updated with the code,
			 *         up to the number of maxlines.
			 *         
			 */
			update_code_context(): Promise<any>
			update_code_context$($: {}): Promise<any>

			/**
			 *  Show clicked context line at top of editor.
			 * 
			 *         If a selection was made, don't jump; allow copying.
			 *         If no visible context, show the top line of the file.
			 *         
			 */
			jumptoline(event?): Promise<any>
			jumptoline$({ event }: { event?}): Promise<any>

			/**
			 * Event on editor text widget triggered every UPDATEINTERVAL ms.
			 */
			timer_event(): Promise<any>
			timer_event$($: {}): Promise<any>
			update_font(): Promise<any>
			update_font$($: {}): Promise<any>
			update_highlight_colors(): Promise<any>
			update_highlight_colors$($: {}): Promise<any>
			UPDATEINTERVAL
		}
		let BLOCKOPENERS: Promise<any>
	}
	module statusbar {
		var _
		function MultiStatusBar(master): Promise<IMultiStatusBar>
		function MultiStatusBar$({ master }): Promise<IMultiStatusBar>
		interface IMultiStatusBar {
			set_label(name, text?, side?, width?): Promise<any>
			set_label$({ name, text, side, width }: { name, text?, side?, width?}): Promise<any>
		}
	}
}
declare module os {
	var _

	/**
	 * makedirs(name [, mode=0o777][, exist_ok=False])
	 * 
	 *     Super-mkdir; create a leaf directory and all intermediate ones.  Works like
	 *     mkdir, except that any intermediate path segment (not just the rightmost)
	 *     will be created if it does not exist. If the target directory already
	 *     exists, raise an OSError if exist_ok is False. Otherwise no exception is
	 *     raised.  This is recursive.
	 * 
	 *     
	 */
	function makedirs(name, mode?, exist_ok?: boolean): Promise<any>
	function makedirs$({ name, mode, exist_ok }: { name, mode?, exist_ok?}): Promise<any>

	/**
	 * removedirs(name)
	 * 
	 *     Super-rmdir; remove a leaf directory and all empty intermediate
	 *     ones.  Works like rmdir except that, if the leaf directory is
	 *     successfully removed, directories corresponding to rightmost path
	 *     segments will be pruned away until either the whole path is
	 *     consumed or an error occurs.  Errors during this latter phase are
	 *     ignored -- they generally mean that a directory was not empty.
	 * 
	 *     
	 */
	function removedirs(name): Promise<any>
	function removedirs$({ name }): Promise<any>

	/**
	 * renames(old, new)
	 * 
	 *     Super-rename; create directories as necessary and delete any left
	 *     empty.  Works like rename, except creation of any intermediate
	 *     directories needed to make the new pathname good is attempted
	 *     first.  After the rename, directories corresponding to rightmost
	 *     path segments of the old name will be pruned until either the
	 *     whole path is consumed or a nonempty directory is found.
	 * 
	 *     Note: this function can fail with the new directory structure made
	 *     if you lack permissions needed to unlink the leaf directory or
	 *     file.
	 * 
	 *     
	 */
	function renames(old, New): Promise<any>
	function renames$({ old, New }): Promise<any>

	/**
	 * Directory tree generator.
	 * 
	 *     For each directory in the directory tree rooted at top (including top
	 *     itself, but excluding '.' and '..'), yields a 3-tuple
	 * 
	 *         dirpath, dirnames, filenames
	 * 
	 *     dirpath is a string, the path to the directory.  dirnames is a list of
	 *     the names of the subdirectories in dirpath (excluding '.' and '..').
	 *     filenames is a list of the names of the non-directory files in dirpath.
	 *     Note that the names in the lists are just names, with no path components.
	 *     To get a full path (which begins with top) to a file or directory in
	 *     dirpath, do os.path.join(dirpath, name).
	 * 
	 *     If optional arg 'topdown' is true or not specified, the triple for a
	 *     directory is generated before the triples for any of its subdirectories
	 *     (directories are generated top down).  If topdown is false, the triple
	 *     for a directory is generated after the triples for all of its
	 *     subdirectories (directories are generated bottom up).
	 * 
	 *     When topdown is true, the caller can modify the dirnames list in-place
	 *     (e.g., via del or slice assignment), and walk will only recurse into the
	 *     subdirectories whose names remain in dirnames; this can be used to prune the
	 *     search, or to impose a specific order of visiting.  Modifying dirnames when
	 *     topdown is false has no effect on the behavior of os.walk(), since the
	 *     directories in dirnames have already been generated by the time dirnames
	 *     itself is generated. No matter the value of topdown, the list of
	 *     subdirectories is retrieved before the tuples for the directory and its
	 *     subdirectories are generated.
	 * 
	 *     By default errors from the os.scandir() call are ignored.  If
	 *     optional arg 'onerror' is specified, it should be a function; it
	 *     will be called with one argument, an OSError instance.  It can
	 *     report the error to continue with the walk, or raise the exception
	 *     to abort the walk.  Note that the filename is available as the
	 *     filename attribute of the exception object.
	 * 
	 *     By default, os.walk does not follow symbolic links to subdirectories on
	 *     systems that support them.  In order to get this functionality, set the
	 *     optional argument 'followlinks' to true.
	 * 
	 *     Caution:  if you pass a relative pathname for top, don't change the
	 *     current working directory between resumptions of walk.  walk never
	 *     changes the current directory, and assumes that the client doesn't
	 *     either.
	 * 
	 *     Example:
	 * 
	 *     import os
	 *     from os.path import join, getsize
	 *     for root, dirs, files in os.walk('python/Lib/email'):
	 *         print(root, "consumes", end="")
	 *         print(sum(getsize(join(root, name)) for name in files), end="")
	 *         print("bytes in", len(files), "non-directory files")
	 *         if 'CVS' in dirs:
	 *             dirs.remove('CVS')  # don't visit CVS directories
	 * 
	 *     
	 */
	function walk(top, topdown?: boolean, onerror?, followlinks?: boolean): Promise<any>
	function walk$({ top, topdown, onerror, followlinks }: { top, topdown?, onerror?, followlinks?}): Promise<any>

	/**
	 * Directory tree generator.
	 * 
	 *         This behaves exactly like walk(), except that it yields a 4-tuple
	 * 
	 *             dirpath, dirnames, filenames, dirfd
	 * 
	 *         `dirpath`, `dirnames` and `filenames` are identical to walk() output,
	 *         and `dirfd` is a file descriptor referring to the directory `dirpath`.
	 * 
	 *         The advantage of fwalk() over walk() is that it's safe against symlink
	 *         races (when follow_symlinks is False).
	 * 
	 *         If dir_fd is not None, it should be a file descriptor open to a directory,
	 *           and top should be relative; top will then be relative to that directory.
	 *           (dir_fd is always supported for fwalk.)
	 * 
	 *         Caution:
	 *         Since fwalk() yields file descriptors, those are only valid until the
	 *         next iteration step, so you should dup() them if you want to keep them
	 *         for a longer period.
	 * 
	 *         Example:
	 * 
	 *         import os
	 *         for root, dirs, files, rootfd in os.fwalk('python/Lib/email'):
	 *             print(root, "consumes", end="")
	 *             print(sum(os.stat(name, dir_fd=rootfd).st_size for name in files),
	 *                   end="")
	 *             print("bytes in", len(files), "non-directory files")
	 *             if 'CVS' in dirs:
	 *                 dirs.remove('CVS')  # don't visit CVS directories
	 *         
	 */
	function fwalk(top?, topdown?: boolean, onerror?): Promise<any>
	function fwalk$({ top, topdown, onerror }: { top?, topdown?, onerror?}): Promise<any>

	/**
	 * execl(file, *args)
	 * 
	 *     Execute the executable file with argument list args, replacing the
	 *     current process. 
	 */
	function execl(file): Promise<any>
	function execl$({ file }): Promise<any>

	/**
	 * execle(file, *args, env)
	 * 
	 *     Execute the executable file with argument list args and
	 *     environment env, replacing the current process. 
	 */
	function execle(file): Promise<any>
	function execle$({ file }): Promise<any>

	/**
	 * execlp(file, *args)
	 * 
	 *     Execute the executable file (which is searched for along $PATH)
	 *     with argument list args, replacing the current process. 
	 */
	function execlp(file): Promise<any>
	function execlp$({ file }): Promise<any>

	/**
	 * execlpe(file, *args, env)
	 * 
	 *     Execute the executable file (which is searched for along $PATH)
	 *     with argument list args and environment env, replacing the current
	 *     process. 
	 */
	function execlpe(file): Promise<any>
	function execlpe$({ file }): Promise<any>

	/**
	 * execvp(file, args)
	 * 
	 *     Execute the executable file (which is searched for along $PATH)
	 *     with argument list args, replacing the current process.
	 *     args may be a list or tuple of strings. 
	 */
	function execvp(file, args): Promise<any>
	function execvp$({ file, args }): Promise<any>

	/**
	 * execvpe(file, args, env)
	 * 
	 *     Execute the executable file (which is searched for along $PATH)
	 *     with argument list args and environment env, replacing the
	 *     current process.
	 *     args may be a list or tuple of strings. 
	 */
	function execvpe(file, args, env): Promise<any>
	function execvpe$({ file, args, env }): Promise<any>

	/**
	 * Returns the sequence of directories that will be searched for the
	 *     named executable (similar to a shell) when launching a process.
	 * 
	 *     *env* must be an environment variable dict or None.  If *env* is None,
	 *     os.environ will be used.
	 *     
	 */
	function get_exec_path(env?): Promise<any>
	function get_exec_path$({ env }: { env?}): Promise<any>

	/**
	 * Get an environment variable, return None if it doesn't exist.
	 *     The optional second argument can specify an alternate default.
	 *     key, default and the result are str.
	 */
	function getenv(key, def?): Promise<any>
	function getenv$({ key, def }: { key, def?}): Promise<any>

	/**
	 * Get an environment variable, return None if it doesn't exist.
	 *         The optional second argument can specify an alternate default.
	 *         key, default and the result are bytes.
	 */
	function getenvb(key, def?): Promise<any>
	function getenvb$({ key, def }: { key, def?}): Promise<any>

	/**
	 * spawnv(mode, file, args) -> integer
	 * 
	 * Execute file with arguments from args in a subprocess.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnv(mode, file, args): Promise<any>
	function spawnv$({ mode, file, args }): Promise<any>

	/**
	 * spawnve(mode, file, args, env) -> integer
	 * 
	 * Execute file with arguments from args in a subprocess with the
	 * specified environment.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnve(mode, file, args, env): Promise<any>
	function spawnve$({ mode, file, args, env }): Promise<any>

	/**
	 * spawnvp(mode, file, args) -> integer
	 * 
	 * Execute file (which is looked for along $PATH) with arguments from
	 * args in a subprocess.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnvp(mode, file, args): Promise<any>
	function spawnvp$({ mode, file, args }): Promise<any>

	/**
	 * spawnvpe(mode, file, args, env) -> integer
	 * 
	 * Execute file (which is looked for along $PATH) with arguments from
	 * args in a subprocess with the supplied environment.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnvpe(mode, file, args, env): Promise<any>
	function spawnvpe$({ mode, file, args, env }): Promise<any>

	/**
	 * spawnl(mode, file, *args) -> integer
	 * 
	 * Execute file with arguments from args in a subprocess.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnl(mode, file): Promise<any>
	function spawnl$({ mode, file }): Promise<any>

	/**
	 * spawnle(mode, file, *args, env) -> integer
	 * 
	 * Execute file with arguments from args in a subprocess with the
	 * supplied environment.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnle(mode, file): Promise<any>
	function spawnle$({ mode, file }): Promise<any>

	/**
	 * spawnlp(mode, file, *args) -> integer
	 * 
	 * Execute file (which is looked for along $PATH) with arguments from
	 * args in a subprocess with the supplied environment.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnlp(mode, file): Promise<any>
	function spawnlp$({ mode, file }): Promise<any>

	/**
	 * spawnlpe(mode, file, *args, env) -> integer
	 * 
	 * Execute file (which is looked for along $PATH) with arguments from
	 * args in a subprocess with the supplied environment.
	 * If mode == P_NOWAIT return the pid of the process.
	 * If mode == P_WAIT return the process's exit code if it exits normally;
	 * otherwise return -SIG, where SIG is the signal that killed it. 
	 */
	function spawnlpe(mode, file): Promise<any>
	function spawnlpe$({ mode, file }): Promise<any>
	function popen(cmd, mode?, buffering?): Promise<any>
	function popen$({ cmd, mode, buffering }: { cmd, mode?, buffering?}): Promise<any>
	function fdopen(fd, mode?, buffering?, encoding?): Promise<any>
	function fdopen$({ fd, mode, buffering, encoding }: { fd, mode?, buffering?, encoding?}): Promise<any>

	/**
	 * Add a path to the DLL search path.
	 * 
	 *         This search path is used when resolving dependencies for imported
	 *         extension modules (the module itself is resolved through sys.path),
	 *         and also by ctypes.
	 * 
	 *         Remove the directory by calling close() on the returned object or
	 *         using it in a with statement.
	 *         
	 */
	function add_dll_directory(path): Promise<any>
	function add_dll_directory$({ path }): Promise<any>
	interface I_Environ {
		copy(): Promise<any>
		copy$($: {}): Promise<any>
		setdefault(key, value): Promise<any>
		setdefault$({ key, value }): Promise<any>
	}
	interface I_wrap_close {
		close(): Promise<any>
		close$($: {}): Promise<any>
	}

	/**
	 * Abstract base class for implementing the file system path protocol.
	 */
	interface IPathLike {
	}
	interface I_AddedDllDirectory {
		close(): Promise<any>
		close$($: {}): Promise<any>
	}
	let GenericAlias: Promise<any>
	let name: Promise<any>
	let linesep: Promise<any>
	let supports_dir_fd: Promise<any>
	let supports_effective_ids: Promise<any>
	let supports_fd: Promise<any>
	let supports_follow_symlinks: Promise<any>
	let SEEK_SET: Promise<any>
	let SEEK_CUR: Promise<any>
	let SEEK_END: Promise<any>
	let environ: Promise<any>
	let supports_bytes_environ: Promise<any>
	let environb: Promise<any>
	let P_WAIT: Promise<any>
	let P_NOWAIT: Promise<any>
	let P_NOWAITO: Promise<any>
	let fspath: Promise<any>
}
declare module platform {
	var _

	/**
	 *  Tries to determine the libc version that the file executable
	 *         (which defaults to the Python interpreter) is linked against.
	 * 
	 *         Returns a tuple of strings (lib,version) which default to the
	 *         given parameters in case the lookup fails.
	 * 
	 *         Note that the function has intimate knowledge of how different
	 *         libc versions add symbols to the executable and thus is probably
	 *         only usable for executables compiled using gcc.
	 * 
	 *         The file is read and scanned in chunks of chunksize bytes.
	 * 
	 *     
	 */
	function libc_ver(executable?, lib?, version?, chunksize?): Promise<any>
	function libc_ver$({ executable, lib, version, chunksize }: { executable?, lib?, version?, chunksize?}): Promise<any>
	function win32_is_iot(): Promise<any>
	function win32_is_iot$($: {}): Promise<any>
	function win32_edition(): Promise<any>
	function win32_edition$($: {}): Promise<any>
	function win32_ver(release?, version?, csd?, ptype?): Promise<any>
	function win32_ver$({ release, version, csd, ptype }: { release?, version?, csd?, ptype?}): Promise<any>

	/**
	 *  Get macOS version information and return it as tuple (release,
	 *         versioninfo, machine) with versioninfo being a tuple (version,
	 *         dev_stage, non_release_version).
	 * 
	 *         Entries which cannot be determined are set to the parameter values
	 *         which default to ''. All tuple entries are strings.
	 *     
	 */
	function mac_ver(release?, versioninfo?, machine?): Promise<any>
	function mac_ver$({ release, versioninfo, machine }: { release?, versioninfo?, machine?}): Promise<any>

	/**
	 *  Version interface for Jython.
	 * 
	 *         Returns a tuple (release, vendor, vminfo, osinfo) with vminfo being
	 *         a tuple (vm_name, vm_release, vm_vendor) and osinfo being a
	 *         tuple (os_name, os_version, os_arch).
	 * 
	 *         Values which cannot be determined are set to the defaults
	 *         given as parameters (which all default to '').
	 * 
	 *     
	 */
	function java_ver(release?, vendor?, vminfo?, osinfo?): Promise<any>
	function java_ver$({ release, vendor, vminfo, osinfo }: { release?, vendor?, vminfo?, osinfo?}): Promise<any>

	/**
	 *  Returns (system, release, version) aliased to common
	 *         marketing names used for some systems.
	 * 
	 *         It also does some reordering of the information in some cases
	 *         where it would otherwise cause confusion.
	 * 
	 *     
	 */
	function system_alias(system, release, version): Promise<any>
	function system_alias$({ system, release, version }): Promise<any>

	/**
	 *  Queries the given executable (defaults to the Python interpreter
	 *         binary) for various architecture information.
	 * 
	 *         Returns a tuple (bits, linkage) which contains information about
	 *         the bit architecture and the linkage format used for the
	 *         executable. Both values are returned as strings.
	 * 
	 *         Values that cannot be determined are returned as given by the
	 *         parameter presets. If bits is given as '', the sizeof(pointer)
	 *         (or sizeof(long) on Python version < 1.5.2) is used as
	 *         indicator for the supported pointer size.
	 * 
	 *         The function relies on the system's "file" command to do the
	 *         actual work. This is available on most if not all Unix
	 *         platforms. On some non-Unix platforms where the "file" command
	 *         does not exist and the executable is set to the Python interpreter
	 *         binary defaults from _default_architecture are used.
	 * 
	 *     
	 */
	function architecture(executable?, bits?, linkage?): Promise<any>
	function architecture$({ executable, bits, linkage }: { executable?, bits?, linkage?}): Promise<any>

	/**
	 *  Fairly portable uname interface. Returns a tuple
	 *         of strings (system, node, release, version, machine, processor)
	 *         identifying the underlying platform.
	 * 
	 *         Note that unlike the os.uname function this also returns
	 *         possible processor information as an additional tuple entry.
	 * 
	 *         Entries which cannot be determined are set to ''.
	 * 
	 *     
	 */
	function uname(): Promise<any>
	function uname$($: {}): Promise<any>

	/**
	 *  Returns the system/OS name, e.g. 'Linux', 'Windows' or 'Java'.
	 * 
	 *         An empty string is returned if the value cannot be determined.
	 * 
	 *     
	 */
	function system(): Promise<any>
	function system$($: {}): Promise<any>

	/**
	 *  Returns the computer's network name (which may not be fully
	 *         qualified)
	 * 
	 *         An empty string is returned if the value cannot be determined.
	 * 
	 *     
	 */
	function node(): Promise<any>
	function node$($: {}): Promise<any>

	/**
	 *  Returns the system's release, e.g. '2.2.0' or 'NT'
	 * 
	 *         An empty string is returned if the value cannot be determined.
	 * 
	 *     
	 */
	function release(): Promise<any>
	function release$($: {}): Promise<any>

	/**
	 *  Returns the system's release version, e.g. '#3 on degas'
	 * 
	 *         An empty string is returned if the value cannot be determined.
	 * 
	 *     
	 */
	function version(): Promise<any>
	function version$($: {}): Promise<any>

	/**
	 *  Returns the machine type, e.g. 'i386'
	 * 
	 *         An empty string is returned if the value cannot be determined.
	 * 
	 *     
	 */
	function machine(): Promise<any>
	function machine$($: {}): Promise<any>

	/**
	 *  Returns the (true) processor name, e.g. 'amdk6'
	 * 
	 *         An empty string is returned if the value cannot be
	 *         determined. Note that many platforms do not provide this
	 *         information or simply return the same value as for machine(),
	 *         e.g.  NetBSD does this.
	 * 
	 *     
	 */
	function processor(): Promise<any>
	function processor$($: {}): Promise<any>

	/**
	 *  Returns a string identifying the Python implementation.
	 * 
	 *         Currently, the following implementations are identified:
	 *           'CPython' (C implementation of Python),
	 *           'IronPython' (.NET implementation of Python),
	 *           'Jython' (Java implementation of Python),
	 *           'PyPy' (Python implementation of Python).
	 * 
	 *     
	 */
	function python_implementation(): Promise<any>
	function python_implementation$($: {}): Promise<any>

	/**
	 *  Returns the Python version as string 'major.minor.patchlevel'
	 * 
	 *         Note that unlike the Python sys.version, the returned value
	 *         will always include the patchlevel (it defaults to 0).
	 * 
	 *     
	 */
	function python_version(): Promise<any>
	function python_version$($: {}): Promise<any>

	/**
	 *  Returns the Python version as tuple (major, minor, patchlevel)
	 *         of strings.
	 * 
	 *         Note that unlike the Python sys.version, the returned value
	 *         will always include the patchlevel (it defaults to 0).
	 * 
	 *     
	 */
	function python_version_tuple(): Promise<any>
	function python_version_tuple$($: {}): Promise<any>

	/**
	 *  Returns a string identifying the Python implementation
	 *         branch.
	 * 
	 *         For CPython this is the SCM branch from which the
	 *         Python binary was built.
	 * 
	 *         If not available, an empty string is returned.
	 * 
	 *     
	 */
	function python_branch(): Promise<any>
	function python_branch$($: {}): Promise<any>

	/**
	 *  Returns a string identifying the Python implementation
	 *         revision.
	 * 
	 *         For CPython this is the SCM revision from which the
	 *         Python binary was built.
	 * 
	 *         If not available, an empty string is returned.
	 * 
	 *     
	 */
	function python_revision(): Promise<any>
	function python_revision$($: {}): Promise<any>

	/**
	 *  Returns a tuple (buildno, builddate) stating the Python
	 *         build number and date as strings.
	 * 
	 *     
	 */
	function python_build(): Promise<any>
	function python_build$($: {}): Promise<any>

	/**
	 *  Returns a string identifying the compiler used for compiling
	 *         Python.
	 * 
	 *     
	 */
	function python_compiler(): Promise<any>
	function python_compiler$($: {}): Promise<any>

	/**
	 *  Returns a single string identifying the underlying platform
	 *         with as much useful information as possible (but no more :).
	 * 
	 *         The output is intended to be human readable rather than
	 *         machine parseable. It may look different on different
	 *         platforms and this is intended.
	 * 
	 *         If "aliased" is true, the function will use aliases for
	 *         various platforms that report system names which differ from
	 *         their common names, e.g. SunOS will be reported as
	 *         Solaris. The system_alias() function is used to implement
	 *         this.
	 * 
	 *         Setting terse to true causes the function to return only the
	 *         absolute minimum information needed to identify the platform.
	 * 
	 *     
	 */
	function platform(aliased?, terse?): Promise<any>
	function platform$({ aliased, terse }: { aliased?, terse?}): Promise<any>

	/**
	 * Return operation system identification from freedesktop.org os-release
	 *     
	 */
	function freedesktop_os_release(): Promise<any>
	function freedesktop_os_release$($: {}): Promise<any>
	interface I_Processor {
		get(): Promise<any>
		get$($: {}): Promise<any>
		get_win32(): Promise<any>
		get_win32$($: {}): Promise<any>
		get_OpenVMS(): Promise<any>
		get_OpenVMS$($: {}): Promise<any>

		/**
		 * 
		 *         Fall back to `uname -p`
		 *         
		 */
		from_subprocess(): Promise<any>
		from_subprocess$($: {}): Promise<any>
	}

	/**
	 * 
	 *     A uname_result that's largely compatible with a
	 *     simple namedtuple except that 'processor' is
	 *     resolved late and cached to avoid calling "uname"
	 *     except when needed.
	 *     
	 */
	interface Iuname_result {
		processor(): Promise<any>
		processor$($: {}): Promise<any>
	}
	let terse: Promise<any>
	let aliased: Promise<any>
}
declare module pstats {
	var _
	function func_strip_path(func_name): Promise<any>
	function func_strip_path$({ func_name }): Promise<any>
	function func_get_function_name(func): Promise<any>
	function func_get_function_name$({ func }): Promise<any>
	function func_std_string(func_name): Promise<any>
	function func_std_string$({ func_name }): Promise<any>

	/**
	 * Add together all the stats for two profile entries.
	 */
	function add_func_stats(target, source): Promise<any>
	function add_func_stats$({ target, source }): Promise<any>

	/**
	 * Combine two caller lists in a single list.
	 */
	function add_callers(target, source): Promise<any>
	function add_callers$({ target, source }): Promise<any>

	/**
	 * Sum the caller statistics to get total number of calls received.
	 */
	function count_calls(callers): Promise<any>
	function count_calls$({ callers }): Promise<any>
	function f8(x): Promise<any>
	function f8$({ x }): Promise<any>
	interface ISortKey {
		CALLS
		CUMULATIVE
		FILENAME
		LINE
		NAME
		NFL
		PCALLS
		STDNAME
		TIME
	}
	interface IFunctionProfile {
	}

	/**
	 * Class for keeping track of an item in inventory.
	 */
	interface IStatsProfile {
	}

	/**
	 * This class is used for creating reports from data generated by the
	 *     Profile class.  It is a "friend" of that class, and imports data either
	 *     by direct access to members of Profile class, or by reading in a dictionary
	 *     that was emitted (via marshal) from the Profile class.
	 * 
	 *     The big change from the previous Profiler (in terms of raw functionality)
	 *     is that an "add()" method has been provided to combine Stats from
	 *     several distinct profile runs.  Both the constructor and the add()
	 *     method now take arbitrarily many file names as arguments.
	 * 
	 *     All the print methods now take an argument that indicates how many lines
	 *     to print.  If the arg is a floating point number between 0 and 1.0, then
	 *     it is taken as a decimal percentage of the available lines to be printed
	 *     (e.g., .1 means print 10% of all available lines).  If it is an integer,
	 *     it is taken to mean the number of lines of data that you wish to have
	 *     printed.
	 * 
	 *     The sort_stats() method now processes some additional options (i.e., in
	 *     addition to the old -1, 0, 1, or 2 that are respectively interpreted as
	 *     'stdname', 'calls', 'time', and 'cumulative').  It takes either an
	 *     arbitrary number of quoted strings or SortKey enum to select the sort
	 *     order.
	 * 
	 *     For example sort_stats('time', 'name') or sort_stats(SortKey.TIME,
	 *     SortKey.NAME) sorts on the major key of 'internal function time', and on
	 *     the minor key of 'the name of the function'.  Look at the two tables in
	 *     sort_stats() and get_sort_arg_defs(self) for more examples.
	 * 
	 *     All methods return self, so you can string together commands like:
	 *         Stats('foo', 'goo').strip_dirs().sort_stats('calls').                            print_stats(5).print_callers(5)
	 *     
	 */
	function Stats(): Promise<IStats>
	function Stats$({ }): Promise<IStats>
	interface IStats {
		init(arg): Promise<any>
		init$({ arg }): Promise<any>
		load_stats(arg): Promise<any>
		load_stats$({ arg }): Promise<any>
		get_top_level_stats(): Promise<any>
		get_top_level_stats$($: {}): Promise<any>
		add(): Promise<any>
		add$($: {}): Promise<any>

		/**
		 * Write the profile data to a file we know how to load back.
		 */
		dump_stats(filename): Promise<any>
		dump_stats$({ filename }): Promise<any>

		/**
		 * Expand all abbreviations that are unique.
		 */
		get_sort_arg_defs(): Promise<any>
		get_sort_arg_defs$($: {}): Promise<any>
		sort_stats(): Promise<any>
		sort_stats$($: {}): Promise<any>
		reverse_order(): Promise<any>
		reverse_order$($: {}): Promise<any>
		strip_dirs(): Promise<any>
		strip_dirs$($: {}): Promise<any>
		calc_callees(): Promise<any>
		calc_callees$($: {}): Promise<any>
		eval_print_amount(sel, list, msg): Promise<any>
		eval_print_amount$({ sel, list, msg }): Promise<any>

		/**
		 * This method returns an instance of StatsProfile, which contains a mapping
		 *         of function names to instances of FunctionProfile. Each FunctionProfile
		 *         instance holds information related to the function's profile such as how
		 *         long the function took to run, how many times it was called, etc...
		 *         
		 */
		get_stats_profile(): Promise<any>
		get_stats_profile$($: {}): Promise<any>
		get_print_list(sel_list): Promise<any>
		get_print_list$({ sel_list }): Promise<any>
		print_stats(): Promise<any>
		print_stats$($: {}): Promise<any>
		print_callees(): Promise<any>
		print_callees$($: {}): Promise<any>
		print_callers(): Promise<any>
		print_callers$($: {}): Promise<any>
		print_call_heading(name_size, column_title): Promise<any>
		print_call_heading$({ name_size, column_title }): Promise<any>
		print_call_line(name_size, source, call_dict, arrow?): Promise<any>
		print_call_line$({ name_size, source, call_dict, arrow }: { name_size, source, call_dict, arrow?}): Promise<any>
		print_title(): Promise<any>
		print_title$($: {}): Promise<any>
		print_line(func): Promise<any>
		print_line$({ func }): Promise<any>
		sort_arg_dict_default
	}

	/**
	 * This class provides a generic function for comparing any two tuples.
	 *     Each instance records a list of tuple-indices (from most significant
	 *     to least significant), and sort direction (ascending or descending) for
	 *     each tuple-index.  The compare functions can then be used as the function
	 *     argument to the system sort() function when a list of tuples need to be
	 *     sorted in the instances order.
	 */
	function TupleComp(comp_select_list): Promise<ITupleComp>
	function TupleComp$({ comp_select_list }): Promise<ITupleComp>
	interface ITupleComp {
		compare(left, right): Promise<any>
		compare$({ left, right }): Promise<any>
	}
	function ProfileBrowser(profile?): Promise<IProfileBrowser>
	function ProfileBrowser$({ profile }: { profile?}): Promise<IProfileBrowser>
	interface IProfileBrowser {
		generic(fn, line): Promise<any>
		generic$({ fn, line }): Promise<any>
		generic_help(): Promise<any>
		generic_help$($: {}): Promise<any>
		do_add(line): Promise<any>
		do_add$({ line }): Promise<any>
		help_add(): Promise<any>
		help_add$($: {}): Promise<any>
		do_callees(line): Promise<any>
		do_callees$({ line }): Promise<any>
		help_callees(): Promise<any>
		help_callees$($: {}): Promise<any>
		do_callers(line): Promise<any>
		do_callers$({ line }): Promise<any>
		help_callers(): Promise<any>
		help_callers$($: {}): Promise<any>
		do_EOF(line): Promise<any>
		do_EOF$({ line }): Promise<any>
		help_EOF(): Promise<any>
		help_EOF$($: {}): Promise<any>
		do_quit(line): Promise<any>
		do_quit$({ line }): Promise<any>
		help_quit(): Promise<any>
		help_quit$($: {}): Promise<any>
		do_read(line): Promise<any>
		do_read$({ line }): Promise<any>
		help_read(): Promise<any>
		help_read$($: {}): Promise<any>
		do_reverse(line): Promise<any>
		do_reverse$({ line }): Promise<any>
		help_reverse(): Promise<any>
		help_reverse$($: {}): Promise<any>
		do_sort(line): Promise<any>
		do_sort$({ line }): Promise<any>
		help_sort(): Promise<any>
		help_sort$($: {}): Promise<any>
		complete_sort(text): Promise<any>
		complete_sort$({ text }): Promise<any>
		do_stats(line): Promise<any>
		do_stats$({ line }): Promise<any>
		help_stats(): Promise<any>
		help_stats$($: {}): Promise<any>
		do_strip(line): Promise<any>
		do_strip$({ line }): Promise<any>
		help_strip(): Promise<any>
		help_strip$($: {}): Promise<any>
		help_help(): Promise<any>
		help_help$($: {}): Promise<any>
		postcmd(stop, line): Promise<any>
		postcmd$({ stop, line }): Promise<any>
	}
	let initprofile: Promise<any>
	let browser: Promise<any>
}
declare module signal {
	var _
	function signal(signalnum, handler): Promise<any>
	function signal$({ signalnum, handler }): Promise<any>
	function getsignal(signalnum): Promise<any>
	function getsignal$({ signalnum }): Promise<any>
	function pthread_sigmask(how, mask): Promise<any>
	function pthread_sigmask$({ how, mask }): Promise<any>
	function sigpending(): Promise<any>
	function sigpending$($: {}): Promise<any>
	function sigwait(sigset): Promise<any>
	function sigwait$({ sigset }): Promise<any>
	function valid_signals(): Promise<any>
	function valid_signals$($: {}): Promise<any>
}
declare module socket {
	var _

	/**
	 *  fromfd(fd, family, type[, proto]) -> socket object
	 * 
	 *     Create a socket object from a duplicate of the given file
	 *     descriptor.  The remaining arguments are the same as for socket().
	 *     
	 */
	function fromfd(fd, family, type, proto?): Promise<any>
	function fromfd$({ fd, family, type, proto }: { fd, family, type, proto?}): Promise<any>

	/**
	 *  send_fds(sock, buffers, fds[, flags[, address]]) -> integer
	 * 
	 *         Send the list of file descriptors fds over an AF_UNIX socket.
	 *         
	 */
	function send_fds(sock, buffers, fds, flags?, address?): Promise<any>
	function send_fds$({ sock, buffers, fds, flags, address }: { sock, buffers, fds, flags?, address?}): Promise<any>

	/**
	 *  recv_fds(sock, bufsize, maxfds[, flags]) -> (data, list of file
	 *         descriptors, msg_flags, address)
	 * 
	 *         Receive up to maxfds file descriptors returning the message
	 *         data and a list containing the descriptors.
	 *         
	 */
	function recv_fds(sock, bufsize, maxfds, flags?): Promise<any>
	function recv_fds$({ sock, bufsize, maxfds, flags }: { sock, bufsize, maxfds, flags?}): Promise<any>

	/**
	 *  fromshare(info) -> socket object
	 * 
	 *         Create a socket object from the bytes object returned by
	 *         socket.share(pid).
	 *         
	 */
	function fromshare(info): Promise<any>
	function fromshare$({ info }): Promise<any>

	/**
	 * socketpair([family[, type[, proto]]]) -> (socket object, socket object)
	 * 
	 *         Create a pair of socket objects from the sockets returned by the platform
	 *         socketpair() function.
	 *         The arguments are the same as for socket() except the default family is
	 *         AF_UNIX if defined on the platform; otherwise, the default is AF_INET.
	 *         
	 */
	function socketpair(family?, type?, proto?): Promise<any>
	function socketpair$({ family, type, proto }: { family?, type?, proto?}): Promise<any>
	function socketpair(family?, type?, proto?): Promise<any>
	function socketpair$({ family, type, proto }: { family?, type?, proto?}): Promise<any>

	/**
	 * Get fully qualified domain name from name.
	 * 
	 *     An empty argument is interpreted as meaning the local host.
	 * 
	 *     First the hostname returned by gethostbyaddr() is checked, then
	 *     possibly existing aliases. In case no FQDN is available, hostname
	 *     from gethostname() is returned.
	 *     
	 */
	function getfqdn(name?): Promise<any>
	function getfqdn$({ name }: { name?}): Promise<any>

	/**
	 * Connect to *address* and return the socket object.
	 * 
	 *     Convenience function.  Connect to *address* (a 2-tuple ``(host,
	 *     port)``) and return the socket object.  Passing the optional
	 *     *timeout* parameter will set the timeout on the socket instance
	 *     before attempting to connect.  If no *timeout* is supplied, the
	 *     global default timeout setting returned by :func:`getdefaulttimeout`
	 *     is used.  If *source_address* is set it must be a tuple of (host, port)
	 *     for the socket to bind as a source address before making the connection.
	 *     A host of '' or port 0 tells the OS to use the default.
	 *     
	 */
	function create_connection(address, timeout?, source_address?): Promise<any>
	function create_connection$({ address, timeout, source_address }: { address, timeout?, source_address?}): Promise<any>

	/**
	 * Return True if the platform supports creating a SOCK_STREAM socket
	 *     which can handle both AF_INET and AF_INET6 (IPv4 / IPv6) connections.
	 *     
	 */
	function has_dualstack_ipv6(): Promise<any>
	function has_dualstack_ipv6$($: {}): Promise<any>

	/**
	 * Convenience function which creates a SOCK_STREAM type socket
	 *     bound to *address* (a 2-tuple (host, port)) and return the socket
	 *     object.
	 * 
	 *     *family* should be either AF_INET or AF_INET6.
	 *     *backlog* is the queue size passed to socket.listen().
	 *     *reuse_port* dictates whether to use the SO_REUSEPORT socket option.
	 *     *dualstack_ipv6*: if true and the platform supports it, it will
	 *     create an AF_INET6 socket able to accept both IPv4 or IPv6
	 *     connections. When false it will explicitly disable this option on
	 *     platforms that enable it by default (e.g. Linux).
	 * 
	 *     >>> with create_server(('', 8000)) as server:
	 *     ...     while True:
	 *     ...         conn, addr = server.accept()
	 *     ...         # handle new connection
	 *     
	 */
	function create_server(address): Promise<any>
	function create_server$({ address }): Promise<any>

	/**
	 * Resolve host and port into list of address info entries.
	 * 
	 *     Translate the host/port argument into a sequence of 5-tuples that contain
	 *     all the necessary arguments for creating a socket connected to that service.
	 *     host is a domain name, a string representation of an IPv4/v6 address or
	 *     None. port is a string service name such as 'http', a numeric port number or
	 *     None. By passing None as the value of host and port, you can pass NULL to
	 *     the underlying C API.
	 * 
	 *     The family, type and proto arguments can be optionally specified in order to
	 *     narrow the list of addresses returned. Passing zero as a value for each of
	 *     these arguments selects the full range of results.
	 *     
	 */
	function getaddrinfo(host, port, family?, type?, proto?, flags?): Promise<any>
	function getaddrinfo$({ host, port, family, type, proto, flags }: { host, port, family?, type?, proto?, flags?}): Promise<any>
	interface I_GiveupOnSendfile {
	}

	/**
	 * A subclass of _socket.socket adding the makefile() method.
	 */
	function socket(family?, type?, proto?, fileno?): Promise<Isocket>
	function socket$({ family, type, proto, fileno }: { family?, type?, proto?, fileno?}): Promise<Isocket>
	interface Isocket {

		/**
		 * dup() -> socket object
		 * 
		 *         Duplicate the socket. Return a new socket object connected to the same
		 *         system resource. The new socket is non-inheritable.
		 *         
		 */
		dup(): Promise<any>
		dup$($: {}): Promise<any>

		/**
		 * accept() -> (socket object, address info)
		 * 
		 *         Wait for an incoming connection.  Return a new socket
		 *         representing the connection, and the address of the client.
		 *         For IP sockets, the address info is a pair (hostaddr, port).
		 *         
		 */
		accept(): Promise<any>
		accept$($: {}): Promise<any>

		/**
		 * makefile(...) -> an I/O stream connected to the socket
		 * 
		 *         The arguments are as for io.open() after the filename, except the only
		 *         supported mode values are 'r' (default), 'w' and 'b'.
		 *         
		 */
		makefile(mode?, buffering?): Promise<any>
		makefile$({ mode, buffering }: { mode?, buffering?}): Promise<any>

		/**
		 * sendfile(file[, offset[, count]]) -> sent
		 * 
		 *         Send a file until EOF is reached by using high-performance
		 *         os.sendfile() and return the total number of bytes which
		 *         were sent.
		 *         *file* must be a regular file object opened in binary mode.
		 *         If os.sendfile() is not available (e.g. Windows) or file is
		 *         not a regular file socket.send() will be used instead.
		 *         *offset* tells from where to start reading the file.
		 *         If specified, *count* is the total number of bytes to transmit
		 *         as opposed to sending the file until EOF is reached.
		 *         File position is updated on return or also in case of error in
		 *         which case file.tell() can be used to figure out the number of
		 *         bytes which were sent.
		 *         The socket must be of SOCK_STREAM type.
		 *         Non-blocking sockets are not supported.
		 *         
		 */
		sendfile(file, offset?, count?): Promise<any>
		sendfile$({ file, offset, count }: { file, offset?, count?}): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>

		/**
		 * detach() -> file descriptor
		 * 
		 *         Close the socket object without closing the underlying file descriptor.
		 *         The object cannot be used after this call, but the file descriptor
		 *         can be reused for other purposes.  The file descriptor is returned.
		 *         
		 */
		detach(): Promise<any>
		detach$($: {}): Promise<any>

		/**
		 * Read-only access to the address family for this socket.
		 *         
		 */
		family(): Promise<any>
		family$($: {}): Promise<any>

		/**
		 * Read-only access to the socket type.
		 *         
		 */
		type(): Promise<any>
		type$($: {}): Promise<any>
	}

	/**
	 * Raw I/O implementation for stream sockets.
	 * 
	 *     This class supports the makefile() method on sockets.  It provides
	 *     the raw I/O interface on top of a socket object.
	 *     
	 */
	function SocketIO(sock, mode): Promise<ISocketIO>
	function SocketIO$({ sock, mode }): Promise<ISocketIO>
	interface ISocketIO {

		/**
		 * Read up to len(b) bytes into the writable buffer *b* and return
		 *         the number of bytes read.  If the socket is non-blocking and no bytes
		 *         are available, None is returned.
		 * 
		 *         If *b* is non-empty, a 0 return value indicates that the connection
		 *         was shutdown at the other end.
		 *         
		 */
		readinto(b): Promise<any>
		readinto$({ b }): Promise<any>

		/**
		 * Write the given bytes or bytearray object *b* to the socket
		 *         and return the number of bytes written.  This can be less than
		 *         len(b) if not all data could be written.  If the socket is
		 *         non-blocking and no bytes could be written None is returned.
		 *         
		 */
		write(b): Promise<any>
		write$({ b }): Promise<any>

		/**
		 * True if the SocketIO is open for reading.
		 *         
		 */
		readable(): Promise<any>
		readable$($: {}): Promise<any>

		/**
		 * True if the SocketIO is open for writing.
		 *         
		 */
		writable(): Promise<any>
		writable$($: {}): Promise<any>

		/**
		 * True if the SocketIO is open for seeking.
		 *         
		 */
		seekable(): Promise<any>
		seekable$($: {}): Promise<any>

		/**
		 * Return the file descriptor of the underlying socket.
		 *         
		 */
		fileno(): Promise<any>
		fileno$($: {}): Promise<any>
		name(): Promise<any>
		name$($: {}): Promise<any>
		mode(): Promise<any>
		mode$($: {}): Promise<any>

		/**
		 * Close the SocketIO object.  This doesn't close the underlying
		 *         socket, except if all references to it have disappeared.
		 *         
		 */
		close(): Promise<any>
		close$($: {}): Promise<any>
	}
	let EBADF: Promise<any>
	let EAGAIN: Promise<any>
	let EWOULDBLOCK: Promise<any>
	let errorTab: Promise<any>
}
declare module socketserver {
	var _

	/**
	 * Base class for server classes.
	 * 
	 *     Methods for the caller:
	 * 
	 *     - __init__(server_address, RequestHandlerClass)
	 *     - serve_forever(poll_interval=0.5)
	 *     - shutdown()
	 *     - handle_request()  # if you do not use serve_forever()
	 *     - fileno() -> int   # for selector
	 * 
	 *     Methods that may be overridden:
	 * 
	 *     - server_bind()
	 *     - server_activate()
	 *     - get_request() -> request, client_address
	 *     - handle_timeout()
	 *     - verify_request(request, client_address)
	 *     - server_close()
	 *     - process_request(request, client_address)
	 *     - shutdown_request(request)
	 *     - close_request(request)
	 *     - service_actions()
	 *     - handle_error()
	 * 
	 *     Methods for derived classes:
	 * 
	 *     - finish_request(request, client_address)
	 * 
	 *     Class variables that may be overridden by derived classes or
	 *     instances:
	 * 
	 *     - timeout
	 *     - address_family
	 *     - socket_type
	 *     - allow_reuse_address
	 * 
	 *     Instance variables:
	 * 
	 *     - RequestHandlerClass
	 *     - socket
	 * 
	 *     
	 */

	/**
	 * Constructor.  May be extended, do not override.
	 */
	function BaseServer(server_address, RequestHandlerClass): Promise<IBaseServer>
	function BaseServer$({ server_address, RequestHandlerClass }): Promise<IBaseServer>
	interface IBaseServer {

		/**
		 * Called by constructor to activate the server.
		 * 
		 *         May be overridden.
		 * 
		 *         
		 */
		server_activate(): Promise<any>
		server_activate$($: {}): Promise<any>

		/**
		 * Handle one request at a time until shutdown.
		 * 
		 *         Polls for shutdown every poll_interval seconds. Ignores
		 *         self.timeout. If you need to do periodic tasks, do them in
		 *         another thread.
		 *         
		 */
		serve_forever(poll_interval?): Promise<any>
		serve_forever$({ poll_interval }: { poll_interval?}): Promise<any>

		/**
		 * Stops the serve_forever loop.
		 * 
		 *         Blocks until the loop has finished. This must be called while
		 *         serve_forever() is running in another thread, or it will
		 *         deadlock.
		 *         
		 */
		shutdown(): Promise<any>
		shutdown$($: {}): Promise<any>

		/**
		 * Called by the serve_forever() loop.
		 * 
		 *         May be overridden by a subclass / Mixin to implement any code that
		 *         needs to be run during the loop.
		 *         
		 */
		service_actions(): Promise<any>
		service_actions$($: {}): Promise<any>

		/**
		 * Handle one request, possibly blocking.
		 * 
		 *         Respects self.timeout.
		 *         
		 */
		handle_request(): Promise<any>
		handle_request$($: {}): Promise<any>

		/**
		 * Called if no new request arrives within self.timeout.
		 * 
		 *         Overridden by ForkingMixIn.
		 *         
		 */
		handle_timeout(): Promise<any>
		handle_timeout$($: {}): Promise<any>

		/**
		 * Verify the request.  May be overridden.
		 * 
		 *         Return True if we should proceed with this request.
		 * 
		 *         
		 */
		verify_request(request, client_address): Promise<any>
		verify_request$({ request, client_address }): Promise<any>

		/**
		 * Call finish_request.
		 * 
		 *         Overridden by ForkingMixIn and ThreadingMixIn.
		 * 
		 *         
		 */
		process_request(request, client_address): Promise<any>
		process_request$({ request, client_address }): Promise<any>

		/**
		 * Called to clean-up the server.
		 * 
		 *         May be overridden.
		 * 
		 *         
		 */
		server_close(): Promise<any>
		server_close$($: {}): Promise<any>

		/**
		 * Finish one request by instantiating RequestHandlerClass.
		 */
		finish_request(request, client_address): Promise<any>
		finish_request$({ request, client_address }): Promise<any>

		/**
		 * Called to shutdown and close an individual request.
		 */
		shutdown_request(request): Promise<any>
		shutdown_request$({ request }): Promise<any>

		/**
		 * Called to clean up an individual request.
		 */
		close_request(request): Promise<any>
		close_request$({ request }): Promise<any>

		/**
		 * Handle an error gracefully.  May be overridden.
		 * 
		 *         The default is to print a traceback and continue.
		 * 
		 *         
		 */
		handle_error(request, client_address): Promise<any>
		handle_error$({ request, client_address }): Promise<any>
		timeout
	}

	/**
	 * Base class for various socket-based server classes.
	 * 
	 *     Defaults to synchronous IP stream (i.e., TCP).
	 * 
	 *     Methods for the caller:
	 * 
	 *     - __init__(server_address, RequestHandlerClass, bind_and_activate=True)
	 *     - serve_forever(poll_interval=0.5)
	 *     - shutdown()
	 *     - handle_request()  # if you don't use serve_forever()
	 *     - fileno() -> int   # for selector
	 * 
	 *     Methods that may be overridden:
	 * 
	 *     - server_bind()
	 *     - server_activate()
	 *     - get_request() -> request, client_address
	 *     - handle_timeout()
	 *     - verify_request(request, client_address)
	 *     - process_request(request, client_address)
	 *     - shutdown_request(request)
	 *     - close_request(request)
	 *     - handle_error()
	 * 
	 *     Methods for derived classes:
	 * 
	 *     - finish_request(request, client_address)
	 * 
	 *     Class variables that may be overridden by derived classes or
	 *     instances:
	 * 
	 *     - timeout
	 *     - address_family
	 *     - socket_type
	 *     - request_queue_size (only for stream sockets)
	 *     - allow_reuse_address
	 * 
	 *     Instance variables:
	 * 
	 *     - server_address
	 *     - RequestHandlerClass
	 *     - socket
	 * 
	 *     
	 */

	/**
	 * Constructor.  May be extended, do not override.
	 */
	function TCPServer(server_address, RequestHandlerClass, bind_and_activate?: boolean): Promise<ITCPServer>
	function TCPServer$({ server_address, RequestHandlerClass, bind_and_activate }: { server_address, RequestHandlerClass, bind_and_activate?}): Promise<ITCPServer>
	interface ITCPServer extends IBaseServer {

		/**
		 * Called by constructor to bind the socket.
		 * 
		 *         May be overridden.
		 * 
		 *         
		 */
		server_bind(): Promise<any>
		server_bind$($: {}): Promise<any>

		/**
		 * Called by constructor to activate the server.
		 * 
		 *         May be overridden.
		 * 
		 *         
		 */
		server_activate(): Promise<any>
		server_activate$($: {}): Promise<any>

		/**
		 * Called to clean-up the server.
		 * 
		 *         May be overridden.
		 * 
		 *         
		 */
		server_close(): Promise<any>
		server_close$($: {}): Promise<any>

		/**
		 * Return socket file number.
		 * 
		 *         Interface required by selector.
		 * 
		 *         
		 */
		fileno(): Promise<any>
		fileno$($: {}): Promise<any>

		/**
		 * Get the request and client address from the socket.
		 * 
		 *         May be overridden.
		 * 
		 *         
		 */
		get_request(): Promise<any>
		get_request$($: {}): Promise<any>

		/**
		 * Called to shutdown and close an individual request.
		 */
		shutdown_request(request): Promise<any>
		shutdown_request$({ request }): Promise<any>

		/**
		 * Called to clean up an individual request.
		 */
		close_request(request): Promise<any>
		close_request$({ request }): Promise<any>
		address_family
		socket_type
		request_queue_size
		allow_reuse_address
	}

	/**
	 * UDP server class.
	 */
	interface IUDPServer extends ITCPServer {
		get_request(): Promise<any>
		get_request$($: {}): Promise<any>
		server_activate(): Promise<any>
		server_activate$($: {}): Promise<any>
		shutdown_request(request): Promise<any>
		shutdown_request$({ request }): Promise<any>
		close_request(request): Promise<any>
		close_request$({ request }): Promise<any>
		max_packet_size
	}

	/**
	 * Mix-in class to handle each request in a new process.
	 */
	interface IForkingMixIn {

		/**
		 * Internal routine to wait for children that have exited.
		 */
		collect_children(): Promise<any>
		collect_children$($: {}): Promise<any>

		/**
		 * Wait for zombies after self.timeout seconds of inactivity.
		 * 
		 *             May be extended, do not override.
		 *             
		 */
		handle_timeout(): Promise<any>
		handle_timeout$($: {}): Promise<any>

		/**
		 * Collect the zombie child processes regularly in the ForkingMixIn.
		 * 
		 *             service_actions is called in the BaseServer's serve_forever loop.
		 *             
		 */
		service_actions(): Promise<any>
		service_actions$($: {}): Promise<any>

		/**
		 * Fork a new subprocess to process the request.
		 */
		process_request(request, client_address): Promise<any>
		process_request$({ request, client_address }): Promise<any>
		server_close(): Promise<any>
		server_close$($: {}): Promise<any>
		active_children
		max_children
		block_on_close
	}

	/**
	 * 
	 *     Joinable list of all non-daemon threads.
	 *     
	 */
	interface I_Threads {
		append(thread): Promise<any>
		append$({ thread }): Promise<any>
		pop_all(): Promise<any>
		pop_all$($: {}): Promise<any>
		join(): Promise<any>
		join$($: {}): Promise<any>
		reap(): Promise<any>
		reap$($: {}): Promise<any>
	}

	/**
	 * 
	 *     Degenerate version of _Threads.
	 *     
	 */
	interface I_NoThreads {
		append(thread): Promise<any>
		append$({ thread }): Promise<any>
		join(): Promise<any>
		join$($: {}): Promise<any>
	}

	/**
	 * Mix-in class to handle each request in a new thread.
	 */
	interface IThreadingMixIn {

		/**
		 * Same as in BaseServer but as a thread.
		 * 
		 *         In addition, exception handling is done here.
		 * 
		 *         
		 */
		process_request_thread(request, client_address): Promise<any>
		process_request_thread$({ request, client_address }): Promise<any>

		/**
		 * Start a new thread to process the request.
		 */
		process_request(request, client_address): Promise<any>
		process_request$({ request, client_address }): Promise<any>
		server_close(): Promise<any>
		server_close$($: {}): Promise<any>
		daemon_threads
	}
	interface IForkingUDPServer extends IForkingMixIn, IUDPServer {
	}
	interface IForkingTCPServer extends IForkingMixIn, ITCPServer {
	}
	interface IThreadingUDPServer extends IThreadingMixIn, IUDPServer {
	}
	interface IThreadingTCPServer extends IThreadingMixIn, ITCPServer {
	}
	interface IUnixStreamServer extends ITCPServer {
	}
	interface IUnixDatagramServer extends IUDPServer {
	}
	interface IThreadingUnixStreamServer extends IThreadingMixIn, IUnixStreamServer {
	}
	interface IThreadingUnixDatagramServer extends IThreadingMixIn, IUnixDatagramServer {
	}

	/**
	 * Base class for request handler classes.
	 * 
	 *     This class is instantiated for each request to be handled.  The
	 *     constructor sets the instance variables request, client_address
	 *     and server, and then calls the handle() method.  To implement a
	 *     specific service, all you need to do is to derive a class which
	 *     defines a handle() method.
	 * 
	 *     The handle() method can find the request as self.request, the
	 *     client address as self.client_address, and the server (in case it
	 *     needs access to per-server information) as self.server.  Since a
	 *     separate instance is created for each request, the handle() method
	 *     can define other arbitrary instance variables.
	 * 
	 *     
	 */
	function BaseRequestHandler(request, client_address, server): Promise<IBaseRequestHandler>
	function BaseRequestHandler$({ request, client_address, server }): Promise<IBaseRequestHandler>
	interface IBaseRequestHandler {
		setup(): Promise<any>
		setup$($: {}): Promise<any>
		handle(): Promise<any>
		handle$($: {}): Promise<any>
		finish(): Promise<any>
		finish$($: {}): Promise<any>
	}

	/**
	 * Define self.rfile and self.wfile for stream sockets.
	 */
	interface IStreamRequestHandler extends IBaseRequestHandler {
		setup(): Promise<any>
		setup$($: {}): Promise<any>
		finish(): Promise<any>
		finish$($: {}): Promise<any>
		rbufsize
		wbufsize
		disable_nagle_algorithm
	}

	/**
	 * Simple writable BufferedIOBase implementation for a socket
	 * 
	 *     Does not hold data in a buffer, avoiding any need to call flush().
	 */
	interface I_SocketWriter {
		writable(): Promise<any>
		writable$($: {}): Promise<any>
		write(b): Promise<any>
		write$({ b }): Promise<any>
		fileno(): Promise<any>
		fileno$($: {}): Promise<any>
	}

	/**
	 * Define self.rfile and self.wfile for datagram sockets.
	 */
	interface IDatagramRequestHandler extends IBaseRequestHandler {
		setup(): Promise<any>
		setup$($: {}): Promise<any>
		finish(): Promise<any>
		finish$($: {}): Promise<any>
	}
}
declare module sqlite3 {
	var _
	module dbapi2 {
		var _
		function DateFromTicks(ticks): Promise<any>
		function DateFromTicks$({ ticks }): Promise<any>
		function TimeFromTicks(ticks): Promise<any>
		function TimeFromTicks$({ ticks }): Promise<any>
		function TimestampFromTicks(ticks): Promise<any>
		function TimestampFromTicks$({ ticks }): Promise<any>
		function register_adapters_and_converters(): Promise<any>
		function register_adapters_and_converters$($: {}): Promise<any>
		function enable_shared_cache(enable): Promise<any>
		function enable_shared_cache$({ enable }): Promise<any>
		let paramstyle: Promise<any>
		let threadsafety: Promise<any>
		let apilevel: Promise<any>
		let Date: Promise<any>
		let Time: Promise<any>
		let Timestamp: Promise<any>
		let version_info: Promise<any>
		let sqlite_version_info: Promise<any>
		let Binary: Promise<any>
	}
	module dump {
		var _
	}
}
declare module stat {
	var _

	/**
	 * Return the portion of the file's mode that can be set by
	 *     os.chmod().
	 *     
	 */
	function S_IMODE(mode): Promise<any>
	function S_IMODE$({ mode }): Promise<any>

	/**
	 * Return the portion of the file's mode that describes the
	 *     file type.
	 *     
	 */
	function S_IFMT(mode): Promise<any>
	function S_IFMT$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a directory.
	 */
	function S_ISDIR(mode): Promise<any>
	function S_ISDIR$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a character special device file.
	 */
	function S_ISCHR(mode): Promise<any>
	function S_ISCHR$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a block special device file.
	 */
	function S_ISBLK(mode): Promise<any>
	function S_ISBLK$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a regular file.
	 */
	function S_ISREG(mode): Promise<any>
	function S_ISREG$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a FIFO (named pipe).
	 */
	function S_ISFIFO(mode): Promise<any>
	function S_ISFIFO$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a symbolic link.
	 */
	function S_ISLNK(mode): Promise<any>
	function S_ISLNK$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a socket.
	 */
	function S_ISSOCK(mode): Promise<any>
	function S_ISSOCK$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a door.
	 */
	function S_ISDOOR(mode): Promise<any>
	function S_ISDOOR$({ mode }): Promise<any>

	/**
	 * Return True if mode is from an event port.
	 */
	function S_ISPORT(mode): Promise<any>
	function S_ISPORT$({ mode }): Promise<any>

	/**
	 * Return True if mode is from a whiteout.
	 */
	function S_ISWHT(mode): Promise<any>
	function S_ISWHT$({ mode }): Promise<any>

	/**
	 * Convert a file's mode to a string of the form '-rwxrwxrwx'.
	 */
	function filemode(mode): Promise<any>
	function filemode$({ mode }): Promise<any>
	let ST_MODE: Promise<any>
	let ST_INO: Promise<any>
	let ST_DEV: Promise<any>
	let ST_NLINK: Promise<any>
	let ST_UID: Promise<any>
	let ST_GID: Promise<any>
	let ST_SIZE: Promise<any>
	let ST_ATIME: Promise<any>
	let ST_MTIME: Promise<any>
	let ST_CTIME: Promise<any>
	let S_IFDIR: Promise<any>
	let S_IFCHR: Promise<any>
	let S_IFBLK: Promise<any>
	let S_IFREG: Promise<any>
	let S_IFIFO: Promise<any>
	let S_IFLNK: Promise<any>
	let S_IFSOCK: Promise<any>
	let S_IFDOOR: Promise<any>
	let S_IFPORT: Promise<any>
	let S_IFWHT: Promise<any>
	let S_ISUID: Promise<any>
	let S_ISGID: Promise<any>
	let S_ENFMT: Promise<any>
	let S_ISVTX: Promise<any>
	let S_IREAD: Promise<any>
	let S_IWRITE: Promise<any>
	let S_IEXEC: Promise<any>
	let S_IRWXU: Promise<any>
	let S_IRUSR: Promise<any>
	let S_IWUSR: Promise<any>
	let S_IXUSR: Promise<any>
	let S_IRWXG: Promise<any>
	let S_IRGRP: Promise<any>
	let S_IWGRP: Promise<any>
	let S_IXGRP: Promise<any>
	let S_IRWXO: Promise<any>
	let S_IROTH: Promise<any>
	let S_IWOTH: Promise<any>
	let S_IXOTH: Promise<any>
	let UF_NODUMP: Promise<any>
	let UF_IMMUTABLE: Promise<any>
	let UF_APPEND: Promise<any>
	let UF_OPAQUE: Promise<any>
	let UF_NOUNLINK: Promise<any>
	let UF_COMPRESSED: Promise<any>
	let UF_HIDDEN: Promise<any>
	let SF_ARCHIVED: Promise<any>
	let SF_IMMUTABLE: Promise<any>
	let SF_APPEND: Promise<any>
	let SF_NOUNLINK: Promise<any>
	let SF_SNAPSHOT: Promise<any>
	let FILE_ATTRIBUTE_ARCHIVE: Promise<any>
	let FILE_ATTRIBUTE_COMPRESSED: Promise<any>
	let FILE_ATTRIBUTE_DEVICE: Promise<any>
	let FILE_ATTRIBUTE_DIRECTORY: Promise<any>
	let FILE_ATTRIBUTE_ENCRYPTED: Promise<any>
	let FILE_ATTRIBUTE_HIDDEN: Promise<any>
	let FILE_ATTRIBUTE_INTEGRITY_STREAM: Promise<any>
	let FILE_ATTRIBUTE_NORMAL: Promise<any>
	let FILE_ATTRIBUTE_NOT_CONTENT_INDEXED: Promise<any>
	let FILE_ATTRIBUTE_NO_SCRUB_DATA: Promise<any>
	let FILE_ATTRIBUTE_OFFLINE: Promise<any>
	let FILE_ATTRIBUTE_READONLY: Promise<any>
	let FILE_ATTRIBUTE_REPARSE_POINT: Promise<any>
	let FILE_ATTRIBUTE_SPARSE_FILE: Promise<any>
	let FILE_ATTRIBUTE_SYSTEM: Promise<any>
	let FILE_ATTRIBUTE_TEMPORARY: Promise<any>
	let FILE_ATTRIBUTE_VIRTUAL: Promise<any>
}
declare module statistics {
	var _

	/**
	 * Return the sample arithmetic mean of data.
	 * 
	 *     >>> mean([1, 2, 3, 4, 4])
	 *     2.8
	 * 
	 *     >>> from fractions import Fraction as F
	 *     >>> mean([F(3, 7), F(1, 21), F(5, 3), F(1, 3)])
	 *     Fraction(13, 21)
	 * 
	 *     >>> from decimal import Decimal as D
	 *     >>> mean([D("0.5"), D("0.75"), D("0.625"), D("0.375")])
	 *     Decimal('0.5625')
	 * 
	 *     If ``data`` is empty, StatisticsError will be raised.
	 *     
	 */
	function mean(data): Promise<any>
	function mean$({ data }): Promise<any>

	/**
	 * Convert data to floats and compute the arithmetic mean.
	 * 
	 *     This runs faster than the mean() function and it always returns a float.
	 *     If the input dataset is empty, it raises a StatisticsError.
	 * 
	 *     >>> fmean([3.5, 4.0, 5.25])
	 *     4.25
	 *     
	 */
	function fmean(data, weights?): Promise<any>
	function fmean$({ data, weights }: { data, weights?}): Promise<any>

	/**
	 * Convert data to floats and compute the geometric mean.
	 * 
	 *     Raises a StatisticsError if the input dataset is empty,
	 *     if it contains a zero, or if it contains a negative value.
	 * 
	 *     No special efforts are made to achieve exact results.
	 *     (However, this may change in the future.)
	 * 
	 *     >>> round(geometric_mean([54, 24, 36]), 9)
	 *     36.0
	 *     
	 */
	function geometric_mean(data): Promise<any>
	function geometric_mean$({ data }): Promise<any>

	/**
	 * Return the harmonic mean of data.
	 * 
	 *     The harmonic mean is the reciprocal of the arithmetic mean of the
	 *     reciprocals of the data.  It can be used for averaging ratios or
	 *     rates, for example speeds.
	 * 
	 *     Suppose a car travels 40 km/hr for 5 km and then speeds-up to
	 *     60 km/hr for another 5 km. What is the average speed?
	 * 
	 *         >>> harmonic_mean([40, 60])
	 *         48.0
	 * 
	 *     Suppose a car travels 40 km/hr for 5 km, and when traffic clears,
	 *     speeds-up to 60 km/hr for the remaining 30 km of the journey. What
	 *     is the average speed?
	 * 
	 *         >>> harmonic_mean([40, 60], weights=[5, 30])
	 *         56.0
	 * 
	 *     If ``data`` is empty, or any element is less than zero,
	 *     ``harmonic_mean`` will raise ``StatisticsError``.
	 *     
	 */
	function harmonic_mean(data, weights?): Promise<any>
	function harmonic_mean$({ data, weights }: { data, weights?}): Promise<any>

	/**
	 * Return the median (middle value) of numeric data.
	 * 
	 *     When the number of data points is odd, return the middle data point.
	 *     When the number of data points is even, the median is interpolated by
	 *     taking the average of the two middle values:
	 * 
	 *     >>> median([1, 3, 5])
	 *     3
	 *     >>> median([1, 3, 5, 7])
	 *     4.0
	 * 
	 *     
	 */
	function median(data): Promise<any>
	function median$({ data }): Promise<any>

	/**
	 * Return the low median of numeric data.
	 * 
	 *     When the number of data points is odd, the middle value is returned.
	 *     When it is even, the smaller of the two middle values is returned.
	 * 
	 *     >>> median_low([1, 3, 5])
	 *     3
	 *     >>> median_low([1, 3, 5, 7])
	 *     3
	 * 
	 *     
	 */
	function median_low(data): Promise<any>
	function median_low$({ data }): Promise<any>

	/**
	 * Return the high median of data.
	 * 
	 *     When the number of data points is odd, the middle value is returned.
	 *     When it is even, the larger of the two middle values is returned.
	 * 
	 *     >>> median_high([1, 3, 5])
	 *     3
	 *     >>> median_high([1, 3, 5, 7])
	 *     5
	 * 
	 *     
	 */
	function median_high(data): Promise<any>
	function median_high$({ data }): Promise<any>

	/**
	 * Return the 50th percentile (median) of grouped continuous data.
	 * 
	 *     >>> median_grouped([1, 2, 2, 3, 4, 4, 4, 4, 4, 5])
	 *     3.7
	 *     >>> median_grouped([52, 52, 53, 54])
	 *     52.5
	 * 
	 *     This calculates the median as the 50th percentile, and should be
	 *     used when your data is continuous and grouped. In the above example,
	 *     the values 1, 2, 3, etc. actually represent the midpoint of classes
	 *     0.5-1.5, 1.5-2.5, 2.5-3.5, etc. The middle value falls somewhere in
	 *     class 3.5-4.5, and interpolation is used to estimate it.
	 * 
	 *     Optional argument ``interval`` represents the class interval, and
	 *     defaults to 1. Changing the class interval naturally will change the
	 *     interpolated 50th percentile value:
	 * 
	 *     >>> median_grouped([1, 3, 3, 5, 7], interval=1)
	 *     3.25
	 *     >>> median_grouped([1, 3, 3, 5, 7], interval=2)
	 *     3.5
	 * 
	 *     This function does not check whether the data points are at least
	 *     ``interval`` apart.
	 *     
	 */
	function median_grouped(data, interval?): Promise<any>
	function median_grouped$({ data, interval }: { data, interval?}): Promise<any>

	/**
	 * Return the most common data point from discrete or nominal data.
	 * 
	 *     ``mode`` assumes discrete data, and returns a single value. This is the
	 *     standard treatment of the mode as commonly taught in schools:
	 * 
	 *         >>> mode([1, 1, 2, 3, 3, 3, 3, 4])
	 *         3
	 * 
	 *     This also works with nominal (non-numeric) data:
	 * 
	 *         >>> mode(["red", "blue", "blue", "red", "green", "red", "red"])
	 *         'red'
	 * 
	 *     If there are multiple modes with same frequency, return the first one
	 *     encountered:
	 * 
	 *         >>> mode(['red', 'red', 'green', 'blue', 'blue'])
	 *         'red'
	 * 
	 *     If *data* is empty, ``mode``, raises StatisticsError.
	 * 
	 *     
	 */
	function mode(data): Promise<any>
	function mode$({ data }): Promise<any>

	/**
	 * Return a list of the most frequently occurring values.
	 * 
	 *     Will return more than one result if there are multiple modes
	 *     or an empty list if *data* is empty.
	 * 
	 *     >>> multimode('aabbbbbbbbcc')
	 *     ['b']
	 *     >>> multimode('aabbbbccddddeeffffgg')
	 *     ['b', 'd', 'f']
	 *     >>> multimode('')
	 *     []
	 *     
	 */
	function multimode(data): Promise<any>
	function multimode$({ data }): Promise<any>

	/**
	 * Divide *data* into *n* continuous intervals with equal probability.
	 * 
	 *     Returns a list of (n - 1) cut points separating the intervals.
	 * 
	 *     Set *n* to 4 for quartiles (the default).  Set *n* to 10 for deciles.
	 *     Set *n* to 100 for percentiles which gives the 99 cuts points that
	 *     separate *data* in to 100 equal sized groups.
	 * 
	 *     The *data* can be any iterable containing sample.
	 *     The cut points are linearly interpolated between data points.
	 * 
	 *     If *method* is set to *inclusive*, *data* is treated as population
	 *     data.  The minimum value is treated as the 0th percentile and the
	 *     maximum value is treated as the 100th percentile.
	 *     
	 */
	function quantiles(data): Promise<any>
	function quantiles$({ data }): Promise<any>

	/**
	 * Return the sample variance of data.
	 * 
	 *     data should be an iterable of Real-valued numbers, with at least two
	 *     values. The optional argument xbar, if given, should be the mean of
	 *     the data. If it is missing or None, the mean is automatically calculated.
	 * 
	 *     Use this function when your data is a sample from a population. To
	 *     calculate the variance from the entire population, see ``pvariance``.
	 * 
	 *     Examples:
	 * 
	 *     >>> data = [2.75, 1.75, 1.25, 0.25, 0.5, 1.25, 3.5]
	 *     >>> variance(data)
	 *     1.3720238095238095
	 * 
	 *     If you have already calculated the mean of your data, you can pass it as
	 *     the optional second argument ``xbar`` to avoid recalculating it:
	 * 
	 *     >>> m = mean(data)
	 *     >>> variance(data, m)
	 *     1.3720238095238095
	 * 
	 *     This function does not check that ``xbar`` is actually the mean of
	 *     ``data``. Giving arbitrary values for ``xbar`` may lead to invalid or
	 *     impossible results.
	 * 
	 *     Decimals and Fractions are supported:
	 * 
	 *     >>> from decimal import Decimal as D
	 *     >>> variance([D("27.5"), D("30.25"), D("30.25"), D("34.5"), D("41.75")])
	 *     Decimal('31.01875')
	 * 
	 *     >>> from fractions import Fraction as F
	 *     >>> variance([F(1, 6), F(1, 2), F(5, 3)])
	 *     Fraction(67, 108)
	 * 
	 *     
	 */
	function variance(data, xbar?): Promise<any>
	function variance$({ data, xbar }: { data, xbar?}): Promise<any>

	/**
	 * Return the population variance of ``data``.
	 * 
	 *     data should be a sequence or iterable of Real-valued numbers, with at least one
	 *     value. The optional argument mu, if given, should be the mean of
	 *     the data. If it is missing or None, the mean is automatically calculated.
	 * 
	 *     Use this function to calculate the variance from the entire population.
	 *     To estimate the variance from a sample, the ``variance`` function is
	 *     usually a better choice.
	 * 
	 *     Examples:
	 * 
	 *     >>> data = [0.0, 0.25, 0.25, 1.25, 1.5, 1.75, 2.75, 3.25]
	 *     >>> pvariance(data)
	 *     1.25
	 * 
	 *     If you have already calculated the mean of the data, you can pass it as
	 *     the optional second argument to avoid recalculating it:
	 * 
	 *     >>> mu = mean(data)
	 *     >>> pvariance(data, mu)
	 *     1.25
	 * 
	 *     Decimals and Fractions are supported:
	 * 
	 *     >>> from decimal import Decimal as D
	 *     >>> pvariance([D("27.5"), D("30.25"), D("30.25"), D("34.5"), D("41.75")])
	 *     Decimal('24.815')
	 * 
	 *     >>> from fractions import Fraction as F
	 *     >>> pvariance([F(1, 4), F(5, 4), F(1, 2)])
	 *     Fraction(13, 72)
	 * 
	 *     
	 */
	function pvariance(data, mu?): Promise<any>
	function pvariance$({ data, mu }: { data, mu?}): Promise<any>

	/**
	 * Return the square root of the sample variance.
	 * 
	 *     See ``variance`` for arguments and other details.
	 * 
	 *     >>> stdev([1.5, 2.5, 2.5, 2.75, 3.25, 4.75])
	 *     1.0810874155219827
	 * 
	 *     
	 */
	function stdev(data, xbar?): Promise<any>
	function stdev$({ data, xbar }: { data, xbar?}): Promise<any>

	/**
	 * Return the square root of the population variance.
	 * 
	 *     See ``pvariance`` for arguments and other details.
	 * 
	 *     >>> pstdev([1.5, 2.5, 2.5, 2.75, 3.25, 4.75])
	 *     0.986893273527251
	 * 
	 *     
	 */
	function pstdev(data, mu?): Promise<any>
	function pstdev$({ data, mu }: { data, mu?}): Promise<any>

	/**
	 * Covariance
	 * 
	 *     Return the sample covariance of two inputs *x* and *y*. Covariance
	 *     is a measure of the joint variability of two inputs.
	 * 
	 *     >>> x = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	 *     >>> y = [1, 2, 3, 1, 2, 3, 1, 2, 3]
	 *     >>> covariance(x, y)
	 *     0.75
	 *     >>> z = [9, 8, 7, 6, 5, 4, 3, 2, 1]
	 *     >>> covariance(x, z)
	 *     -7.5
	 *     >>> covariance(z, x)
	 *     -7.5
	 * 
	 *     
	 */
	function covariance(x, y): Promise<any>
	function covariance$({ x, y }): Promise<any>

	/**
	 * Pearson's correlation coefficient
	 * 
	 *     Return the Pearson's correlation coefficient for two inputs. Pearson's
	 *     correlation coefficient *r* takes values between -1 and +1. It measures the
	 *     strength and direction of the linear relationship, where +1 means very
	 *     strong, positive linear relationship, -1 very strong, negative linear
	 *     relationship, and 0 no linear relationship.
	 * 
	 *     >>> x = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	 *     >>> y = [9, 8, 7, 6, 5, 4, 3, 2, 1]
	 *     >>> correlation(x, x)
	 *     1.0
	 *     >>> correlation(x, y)
	 *     -1.0
	 * 
	 *     
	 */
	function correlation(x, y): Promise<any>
	function correlation$({ x, y }): Promise<any>

	/**
	 * Slope and intercept for simple linear regression.
	 * 
	 *     Return the slope and intercept of simple linear regression
	 *     parameters estimated using ordinary least squares. Simple linear
	 *     regression describes relationship between an independent variable
	 *     *x* and a dependent variable *y* in terms of linear function:
	 * 
	 *         y = slope * x + intercept + noise
	 * 
	 *     where *slope* and *intercept* are the regression parameters that are
	 *     estimated, and noise represents the variability of the data that was
	 *     not explained by the linear regression (it is equal to the
	 *     difference between predicted and actual values of the dependent
	 *     variable).
	 * 
	 *     The parameters are returned as a named tuple.
	 * 
	 *     >>> x = [1, 2, 3, 4, 5]
	 *     >>> noise = NormalDist().samples(5, seed=42)
	 *     >>> y = [3 * x[i] + 2 + noise[i] for i in range(5)]
	 *     >>> linear_regression(x, y)  #doctest: +ELLIPSIS
	 *     LinearRegression(slope=3.09078914170..., intercept=1.75684970486...)
	 * 
	 *     
	 */
	function linear_regression(x, y): Promise<any>
	function linear_regression$({ x, y }): Promise<any>
	interface IStatisticsError {
	}

	/**
	 * Normal distribution of a random variable
	 */

	/**
	 * NormalDist where mu is the mean and sigma is the standard deviation.
	 */
	function NormalDist(mu?, sigma?): Promise<INormalDist>
	function NormalDist$({ mu, sigma }: { mu?, sigma?}): Promise<INormalDist>
	interface INormalDist {

		/**
		 * Make a normal distribution instance from sample data.
		 */
		from_samples(data): Promise<any>
		from_samples$({ data }): Promise<any>

		/**
		 * Generate *n* samples for a given mean and standard deviation.
		 */
		samples(n): Promise<any>
		samples$({ n }): Promise<any>

		/**
		 * Probability density function.  P(x <= X < x+dx) / dx
		 */
		pdf(x): Promise<any>
		pdf$({ x }): Promise<any>

		/**
		 * Cumulative distribution function.  P(X <= x)
		 */
		cdf(x): Promise<any>
		cdf$({ x }): Promise<any>

		/**
		 * Inverse cumulative distribution function.  x : P(X <= x) = p
		 * 
		 *         Finds the value of the random variable such that the probability of
		 *         the variable being less than or equal to that value equals the given
		 *         probability.
		 * 
		 *         This function is also called the percent point function or quantile
		 *         function.
		 *         
		 */
		inv_cdf(p): Promise<any>
		inv_cdf$({ p }): Promise<any>

		/**
		 * Divide into *n* continuous intervals with equal probability.
		 * 
		 *         Returns a list of (n - 1) cut points separating the intervals.
		 * 
		 *         Set *n* to 4 for quartiles (the default).  Set *n* to 10 for deciles.
		 *         Set *n* to 100 for percentiles which gives the 99 cuts points that
		 *         separate the normal distribution in to 100 equal sized groups.
		 *         
		 */
		quantiles(n?): Promise<any>
		quantiles$({ n }: { n?}): Promise<any>

		/**
		 * Compute the overlapping coefficient (OVL) between two normal distributions.
		 * 
		 *         Measures the agreement between two normal probability distributions.
		 *         Returns a value between 0.0 and 1.0 giving the overlapping area in
		 *         the two underlying probability density functions.
		 * 
		 *             >>> N1 = NormalDist(2.4, 1.6)
		 *             >>> N2 = NormalDist(3.2, 2.0)
		 *             >>> N1.overlap(N2)
		 *             0.8035050657330205
		 *         
		 */
		overlap(other): Promise<any>
		overlap$({ other }): Promise<any>

		/**
		 * Compute the Standard Score.  (x - mean) / stdev
		 * 
		 *         Describes *x* in terms of the number of standard deviations
		 *         above or below the mean of the normal distribution.
		 *         
		 */
		zscore(x): Promise<any>
		zscore$({ x }): Promise<any>

		/**
		 * Arithmetic mean of the normal distribution.
		 */
		mean(): Promise<any>
		mean$($: {}): Promise<any>

		/**
		 * Return the median of the normal distribution
		 */
		median(): Promise<any>
		median$($: {}): Promise<any>

		/**
		 * Return the mode of the normal distribution
		 * 
		 *         The mode is the value x where which the probability density
		 *         function (pdf) takes its maximum value.
		 *         
		 */
		mode(): Promise<any>
		mode$($: {}): Promise<any>

		/**
		 * Standard deviation of the normal distribution.
		 */
		stdev(): Promise<any>
		stdev$($: {}): Promise<any>

		/**
		 * Square of the standard deviation.
		 */
		variance(): Promise<any>
		variance$($: {}): Promise<any>
	}
	let LinearRegression: Promise<any>
}
declare module tarfile {
	var _

	/**
	 * Convert a string to a null-terminated bytes object.
	 *     
	 */
	function stn(s, length, encoding, errors): Promise<any>
	function stn$({ s, length, encoding, errors }): Promise<any>

	/**
	 * Convert a null-terminated bytes object to a string.
	 *     
	 */
	function nts(s, encoding, errors): Promise<any>
	function nts$({ s, encoding, errors }): Promise<any>

	/**
	 * Convert a number field to a python number.
	 *     
	 */
	function nti(s): Promise<any>
	function nti$({ s }): Promise<any>

	/**
	 * Convert a python number to a number field.
	 *     
	 */
	function itn(n, digits?, format?): Promise<any>
	function itn$({ n, digits, format }: { n, digits?, format?}): Promise<any>

	/**
	 * Calculate the checksum for a member's header by summing up all
	 *        characters except for the chksum field which is treated as if
	 *        it was filled with spaces. According to the GNU tar sources,
	 *        some tars (Sun and NeXT) calculate chksum with signed char,
	 *        which will be different if there are chars in the buffer with
	 *        the high bit set. So we calculate two checksums, unsigned and
	 *        signed.
	 *     
	 */
	function calc_chksums(buf): Promise<any>
	function calc_chksums$({ buf }): Promise<any>

	/**
	 * Copy length bytes from fileobj src to fileobj dst.
	 *        If length is None, copy the entire content.
	 *     
	 */
	function copyfileobj(src, dst, length?, exception?, bufsize?): Promise<any>
	function copyfileobj$({ src, dst, length, exception, bufsize }: { src, dst, length?, exception?, bufsize?}): Promise<any>

	/**
	 * Return True if name points to a tar archive that we
	 *        are able to handle, else return False.
	 * 
	 *        'name' should be a string, file, or file-like object.
	 *     
	 */
	function is_tarfile(name): Promise<any>
	function is_tarfile$({ name }): Promise<any>
	function main(): Promise<any>
	function main$($: {}): Promise<any>

	/**
	 * Base exception.
	 */
	interface ITarError {
	}

	/**
	 * General exception for extract errors.
	 */
	interface IExtractError extends ITarError {
	}

	/**
	 * Exception for unreadable tar archives.
	 */
	interface IReadError extends ITarError {
	}

	/**
	 * Exception for unavailable compression methods.
	 */
	interface ICompressionError extends ITarError {
	}

	/**
	 * Exception for unsupported operations on stream-like TarFiles.
	 */
	interface IStreamError extends ITarError {
	}

	/**
	 * Base exception for header errors.
	 */
	interface IHeaderError extends ITarError {
	}

	/**
	 * Exception for empty headers.
	 */
	interface IEmptyHeaderError extends IHeaderError {
	}

	/**
	 * Exception for truncated headers.
	 */
	interface ITruncatedHeaderError extends IHeaderError {
	}

	/**
	 * Exception for end of file headers.
	 */
	interface IEOFHeaderError extends IHeaderError {
	}

	/**
	 * Exception for invalid headers.
	 */
	interface IInvalidHeaderError extends IHeaderError {
	}

	/**
	 * Exception for missing and invalid extended headers.
	 */
	interface ISubsequentHeaderError extends IHeaderError {
	}

	/**
	 * Low-level file object. Supports reading and writing.
	 *        It is used instead of a regular file object for streaming
	 *        access.
	 *     
	 */
	interface I_LowLevelFile {
		close(): Promise<any>
		close$($: {}): Promise<any>
		read(size): Promise<any>
		read$({ size }): Promise<any>
		write(s): Promise<any>
		write$({ s }): Promise<any>
	}

	/**
	 * Class that serves as an adapter between TarFile and
	 *        a stream-like object.  The stream-like object only
	 *        needs to have a read() or write() method and is accessed
	 *        blockwise.  Use of gzip or bzip2 compression is possible.
	 *        A stream-like object could be for example: sys.stdin,
	 *        sys.stdout, a socket, a tape device etc.
	 * 
	 *        _Stream is intended to be used only internally.
	 *     
	 */
	interface I_Stream {

		/**
		 * Write string s to the stream.
		 *         
		 */
		write(s): Promise<any>
		write$({ s }): Promise<any>

		/**
		 * Close the _Stream object. No operation should be
		 *            done on it afterwards.
		 *         
		 */
		close(): Promise<any>
		close$($: {}): Promise<any>

		/**
		 * Return the stream's file pointer position.
		 *         
		 */
		tell(): Promise<any>
		tell$($: {}): Promise<any>

		/**
		 * Set the stream's file pointer to pos. Negative seeking
		 *            is forbidden.
		 *         
		 */
		seek(pos?): Promise<any>
		seek$({ pos }: { pos?}): Promise<any>

		/**
		 * Return the next size number of bytes from the stream.
		 */
		read(size): Promise<any>
		read$({ size }): Promise<any>
	}

	/**
	 * Small proxy class that enables transparent compression
	 *        detection for the Stream interface (mode 'r|*').
	 *     
	 */
	interface I_StreamProxy {
		read(size): Promise<any>
		read$({ size }): Promise<any>
		getcomptype(): Promise<any>
		getcomptype$($: {}): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
	}

	/**
	 * A thin wrapper around an existing file object that
	 *        provides a part of its data as an individual file
	 *        object.
	 *     
	 */
	interface I_FileInFile {
		flush(): Promise<any>
		flush$($: {}): Promise<any>
		readable(): Promise<any>
		readable$($: {}): Promise<any>
		writable(): Promise<any>
		writable$($: {}): Promise<any>
		seekable(): Promise<any>
		seekable$($: {}): Promise<any>

		/**
		 * Return the current file position.
		 *         
		 */
		tell(): Promise<any>
		tell$($: {}): Promise<any>

		/**
		 * Seek to a position in the file.
		 *         
		 */
		seek(position, whence?): Promise<any>
		seek$({ position, whence }: { position, whence?}): Promise<any>

		/**
		 * Read data from the file.
		 *         
		 */
		read(size?): Promise<any>
		read$({ size }: { size?}): Promise<any>
		readinto(b): Promise<any>
		readinto$({ b }): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
	}
	function ExFileObject(tarfile, tarinfo): Promise<IExFileObject>
	function ExFileObject$({ tarfile, tarinfo }): Promise<IExFileObject>
	interface IExFileObject {
	}

	/**
	 * Informational class which holds the details about an
	 *        archive member given by a tar header block.
	 *        TarInfo objects are returned by TarFile.getmember(),
	 *        TarFile.getmembers() and TarFile.gettarinfo() and are
	 *        usually created internally.
	 *     
	 */

	/**
	 * Construct a TarInfo object. name is the optional name
	 *            of the member.
	 *         
	 */
	function TarInfo(name?): Promise<ITarInfo>
	function TarInfo$({ name }: { name?}): Promise<ITarInfo>
	interface ITarInfo {

		/**
		 * In pax headers, "name" is called "path".
		 */
		path(): Promise<any>
		path$($: {}): Promise<any>
		path(name): Promise<any>
		path$({ name }): Promise<any>

		/**
		 * In pax headers, "linkname" is called "linkpath".
		 */
		linkpath(): Promise<any>
		linkpath$($: {}): Promise<any>
		linkpath(linkname): Promise<any>
		linkpath$({ linkname }): Promise<any>

		/**
		 * Return the TarInfo's attributes as a dictionary.
		 *         
		 */
		get_info(): Promise<any>
		get_info$($: {}): Promise<any>

		/**
		 * Return a tar header as a string of 512 byte blocks.
		 *         
		 */
		tobuf(format?, encoding?, errors?): Promise<any>
		tobuf$({ format, encoding, errors }: { format?, encoding?, errors?}): Promise<any>

		/**
		 * Return the object as a ustar header block.
		 *         
		 */
		create_ustar_header(info, encoding, errors): Promise<any>
		create_ustar_header$({ info, encoding, errors }): Promise<any>

		/**
		 * Return the object as a GNU header block sequence.
		 *         
		 */
		create_gnu_header(info, encoding, errors): Promise<any>
		create_gnu_header$({ info, encoding, errors }): Promise<any>

		/**
		 * Return the object as a ustar header block. If it cannot be
		 *            represented this way, prepend a pax extended header sequence
		 *            with supplement information.
		 *         
		 */
		create_pax_header(info, encoding): Promise<any>
		create_pax_header$({ info, encoding }): Promise<any>

		/**
		 * Return the object as a pax global header block sequence.
		 *         
		 */
		create_pax_global_header(pax_headers): Promise<any>
		create_pax_global_header$({ pax_headers }): Promise<any>

		/**
		 * Construct a TarInfo object from a 512 byte bytes object.
		 *         
		 */
		frombuf(buf, encoding, errors): Promise<any>
		frombuf$({ buf, encoding, errors }): Promise<any>

		/**
		 * Return the next TarInfo object from TarFile object
		 *            tarfile.
		 *         
		 */
		fromtarfile(tarfile): Promise<any>
		fromtarfile$({ tarfile }): Promise<any>

		/**
		 * Return True if the Tarinfo object is a regular file.
		 */
		isreg(): Promise<any>
		isreg$($: {}): Promise<any>

		/**
		 * Return True if the Tarinfo object is a regular file.
		 */
		isfile(): Promise<any>
		isfile$($: {}): Promise<any>

		/**
		 * Return True if it is a directory.
		 */
		isdir(): Promise<any>
		isdir$($: {}): Promise<any>

		/**
		 * Return True if it is a symbolic link.
		 */
		issym(): Promise<any>
		issym$($: {}): Promise<any>

		/**
		 * Return True if it is a hard link.
		 */
		islnk(): Promise<any>
		islnk$($: {}): Promise<any>

		/**
		 * Return True if it is a character device.
		 */
		ischr(): Promise<any>
		ischr$($: {}): Promise<any>

		/**
		 * Return True if it is a block device.
		 */
		isblk(): Promise<any>
		isblk$($: {}): Promise<any>

		/**
		 * Return True if it is a FIFO.
		 */
		isfifo(): Promise<any>
		isfifo$($: {}): Promise<any>
		issparse(): Promise<any>
		issparse$($: {}): Promise<any>

		/**
		 * Return True if it is one of character device, block device or FIFO.
		 */
		isdev(): Promise<any>
		isdev$($: {}): Promise<any>
	}

	/**
	 * The TarFile Class provides an interface to tar archives.
	 *     
	 */

	/**
	 * Open an (uncompressed) tar archive `name'. `mode' is either 'r' to
	 *            read from an existing archive, 'a' to append data to an existing
	 *            file or 'w' to create a new file overwriting an existing one. `mode'
	 *            defaults to 'r'.
	 *            If `fileobj' is given, it is used for reading or writing data. If it
	 *            can be determined, `mode' is overridden by `fileobj's mode.
	 *            `fileobj' is not closed, when TarFile is closed.
	 *         
	 */
	function TarFile(name?, mode?, fileobj?, format?, tarinfo?, dereference?, ignore_zeros?, encoding?, errors?, pax_headers?, debug?, errorlevel?, copybufsize?): Promise<ITarFile>
	function TarFile$({ name, mode, fileobj, format, tarinfo, dereference, ignore_zeros, encoding, errors, pax_headers, debug, errorlevel, copybufsize }: { name?, mode?, fileobj?, format?, tarinfo?, dereference?, ignore_zeros?, encoding?, errors?, pax_headers?, debug?, errorlevel?, copybufsize?}): Promise<ITarFile>
	interface ITarFile {

		/**
		 * Open a tar archive for reading, writing or appending. Return
		 *            an appropriate TarFile class.
		 * 
		 *            mode:
		 *            'r' or 'r:*' open for reading with transparent compression
		 *            'r:'         open for reading exclusively uncompressed
		 *            'r:gz'       open for reading with gzip compression
		 *            'r:bz2'      open for reading with bzip2 compression
		 *            'r:xz'       open for reading with lzma compression
		 *            'a' or 'a:'  open for appending, creating the file if necessary
		 *            'w' or 'w:'  open for writing without compression
		 *            'w:gz'       open for writing with gzip compression
		 *            'w:bz2'      open for writing with bzip2 compression
		 *            'w:xz'       open for writing with lzma compression
		 * 
		 *            'x' or 'x:'  create a tarfile exclusively without compression, raise
		 *                         an exception if the file is already created
		 *            'x:gz'       create a gzip compressed tarfile, raise an exception
		 *                         if the file is already created
		 *            'x:bz2'      create a bzip2 compressed tarfile, raise an exception
		 *                         if the file is already created
		 *            'x:xz'       create an lzma compressed tarfile, raise an exception
		 *                         if the file is already created
		 * 
		 *            'r|*'        open a stream of tar blocks with transparent compression
		 *            'r|'         open an uncompressed stream of tar blocks for reading
		 *            'r|gz'       open a gzip compressed stream of tar blocks
		 *            'r|bz2'      open a bzip2 compressed stream of tar blocks
		 *            'r|xz'       open an lzma compressed stream of tar blocks
		 *            'w|'         open an uncompressed stream for writing
		 *            'w|gz'       open a gzip compressed stream for writing
		 *            'w|bz2'      open a bzip2 compressed stream for writing
		 *            'w|xz'       open an lzma compressed stream for writing
		 *         
		 */
		open(name?, mode?, fileobj?, bufsize?): Promise<any>
		open$({ name, mode, fileobj, bufsize }: { name?, mode?, fileobj?, bufsize?}): Promise<any>

		/**
		 * Open uncompressed tar archive name for reading or writing.
		 *         
		 */
		taropen(name, mode?, fileobj?): Promise<any>
		taropen$({ name, mode, fileobj }: { name, mode?, fileobj?}): Promise<any>

		/**
		 * Open gzip compressed tar archive name for reading or writing.
		 *            Appending is not allowed.
		 *         
		 */
		gzopen(name, mode?, fileobj?, compresslevel?): Promise<any>
		gzopen$({ name, mode, fileobj, compresslevel }: { name, mode?, fileobj?, compresslevel?}): Promise<any>

		/**
		 * Open bzip2 compressed tar archive name for reading or writing.
		 *            Appending is not allowed.
		 *         
		 */
		bz2open(name, mode?, fileobj?, compresslevel?): Promise<any>
		bz2open$({ name, mode, fileobj, compresslevel }: { name, mode?, fileobj?, compresslevel?}): Promise<any>

		/**
		 * Open lzma compressed tar archive name for reading or writing.
		 *            Appending is not allowed.
		 *         
		 */
		xzopen(name, mode?, fileobj?, preset?): Promise<any>
		xzopen$({ name, mode, fileobj, preset }: { name, mode?, fileobj?, preset?}): Promise<any>

		/**
		 * Close the TarFile. In write-mode, two finishing zero blocks are
		 *            appended to the archive.
		 *         
		 */
		close(): Promise<any>
		close$($: {}): Promise<any>

		/**
		 * Return a TarInfo object for member `name'. If `name' can not be
		 *            found in the archive, KeyError is raised. If a member occurs more
		 *            than once in the archive, its last occurrence is assumed to be the
		 *            most up-to-date version.
		 *         
		 */
		getmember(name): Promise<any>
		getmember$({ name }): Promise<any>

		/**
		 * Return the members of the archive as a list of TarInfo objects. The
		 *            list has the same order as the members in the archive.
		 *         
		 */
		getmembers(): Promise<any>
		getmembers$($: {}): Promise<any>

		/**
		 * Return the members of the archive as a list of their names. It has
		 *            the same order as the list returned by getmembers().
		 *         
		 */
		getnames(): Promise<any>
		getnames$($: {}): Promise<any>

		/**
		 * Create a TarInfo object from the result of os.stat or equivalent
		 *            on an existing file. The file is either named by `name', or
		 *            specified as a file object `fileobj' with a file descriptor. If
		 *            given, `arcname' specifies an alternative name for the file in the
		 *            archive, otherwise, the name is taken from the 'name' attribute of
		 *            'fileobj', or the 'name' argument. The name should be a text
		 *            string.
		 *         
		 */
		gettarinfo(name?, arcname?, fileobj?): Promise<any>
		gettarinfo$({ name, arcname, fileobj }: { name?, arcname?, fileobj?}): Promise<any>

		/**
		 * Print a table of contents to sys.stdout. If `verbose' is False, only
		 *            the names of the members are printed. If it is True, an `ls -l'-like
		 *            output is produced. `members' is optional and must be a subset of the
		 *            list returned by getmembers().
		 *         
		 */
		list(verbose?: boolean): Promise<any>
		list$({ verbose }: { verbose?}): Promise<any>

		/**
		 * Add the file `name' to the archive. `name' may be any type of file
		 *            (directory, fifo, symbolic link, etc.). If given, `arcname'
		 *            specifies an alternative name for the file in the archive.
		 *            Directories are added recursively by default. This can be avoided by
		 *            setting `recursive' to False. `filter' is a function
		 *            that expects a TarInfo object argument and returns the changed
		 *            TarInfo object, if it returns None the TarInfo object will be
		 *            excluded from the archive.
		 *         
		 */
		add(name, arcname?, recursive?: boolean): Promise<any>
		add$({ name, arcname, recursive }: { name, arcname?, recursive?}): Promise<any>

		/**
		 * Add the TarInfo object `tarinfo' to the archive. If `fileobj' is
		 *            given, it should be a binary file, and tarinfo.size bytes are read
		 *            from it and added to the archive. You can create TarInfo objects
		 *            directly, or by using gettarinfo().
		 *         
		 */
		addfile(tarinfo, fileobj?): Promise<any>
		addfile$({ tarinfo, fileobj }: { tarinfo, fileobj?}): Promise<any>

		/**
		 * Extract all members from the archive to the current working
		 *            directory and set owner, modification time and permissions on
		 *            directories afterwards. `path' specifies a different directory
		 *            to extract to. `members' is optional and must be a subset of the
		 *            list returned by getmembers(). If `numeric_owner` is True, only
		 *            the numbers for user/group names are used and not the names.
		 *         
		 */
		extractall(path?, members?): Promise<any>
		extractall$({ path, members }: { path?, members?}): Promise<any>

		/**
		 * Extract a member from the archive to the current working directory,
		 *            using its full name. Its file information is extracted as accurately
		 *            as possible. `member' may be a filename or a TarInfo object. You can
		 *            specify a different directory using `path'. File attributes (owner,
		 *            mtime, mode) are set unless `set_attrs' is False. If `numeric_owner`
		 *            is True, only the numbers for user/group names are used and not
		 *            the names.
		 *         
		 */
		extract(member, path?, set_attrs?: boolean): Promise<any>
		extract$({ member, path, set_attrs }: { member, path?, set_attrs?}): Promise<any>

		/**
		 * Extract a member from the archive as a file object. `member' may be
		 *            a filename or a TarInfo object. If `member' is a regular file or
		 *            a link, an io.BufferedReader object is returned. For all other
		 *            existing members, None is returned. If `member' does not appear
		 *            in the archive, KeyError is raised.
		 *         
		 */
		extractfile(member): Promise<any>
		extractfile$({ member }): Promise<any>

		/**
		 * Make a directory called targetpath.
		 *         
		 */
		makedir(tarinfo, targetpath): Promise<any>
		makedir$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Make a file called targetpath.
		 *         
		 */
		makefile(tarinfo, targetpath): Promise<any>
		makefile$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Make a file from a TarInfo object with an unknown type
		 *            at targetpath.
		 *         
		 */
		makeunknown(tarinfo, targetpath): Promise<any>
		makeunknown$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Make a fifo called targetpath.
		 *         
		 */
		makefifo(tarinfo, targetpath): Promise<any>
		makefifo$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Make a character or block device called targetpath.
		 *         
		 */
		makedev(tarinfo, targetpath): Promise<any>
		makedev$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Make a (symbolic) link called targetpath. If it cannot be created
		 *           (platform limitation), we try to make a copy of the referenced file
		 *           instead of a link.
		 *         
		 */
		makelink(tarinfo, targetpath): Promise<any>
		makelink$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Set owner of targetpath according to tarinfo. If numeric_owner
		 *            is True, use .gid/.uid instead of .gname/.uname. If numeric_owner
		 *            is False, fall back to .gid/.uid when the search based on name
		 *            fails.
		 *         
		 */
		chown(tarinfo, targetpath, numeric_owner): Promise<any>
		chown$({ tarinfo, targetpath, numeric_owner }): Promise<any>

		/**
		 * Set file permissions of targetpath according to tarinfo.
		 *         
		 */
		chmod(tarinfo, targetpath): Promise<any>
		chmod$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Set modification time of targetpath according to tarinfo.
		 *         
		 */
		utime(tarinfo, targetpath): Promise<any>
		utime$({ tarinfo, targetpath }): Promise<any>

		/**
		 * Return the next member of the archive as a TarInfo object, when
		 *            TarFile is opened for reading. Return None if there is no more
		 *            available.
		 *         
		 */
		next(): Promise<any>
		next$($: {}): Promise<any>
		debug
		dereference
		ignore_zeros
		errorlevel
		format
		encoding
		errors
		tarinfo
		fileobject
		OPEN_METH
	}
	let version: Promise<any>
	let symlink_exception: Promise<any>
	let NUL: Promise<any>
	let BLOCKSIZE: Promise<any>
	let RECORDSIZE: Promise<any>
	let GNU_MAGIC: Promise<any>
	let POSIX_MAGIC: Promise<any>
	let LENGTH_NAME: Promise<any>
	let LENGTH_LINK: Promise<any>
	let LENGTH_PREFIX: Promise<any>
	let REGTYPE: Promise<any>
	let AREGTYPE: Promise<any>
	let LNKTYPE: Promise<any>
	let SYMTYPE: Promise<any>
	let CHRTYPE: Promise<any>
	let BLKTYPE: Promise<any>
	let DIRTYPE: Promise<any>
	let FIFOTYPE: Promise<any>
	let CONTTYPE: Promise<any>
	let GNUTYPE_LONGNAME: Promise<any>
	let GNUTYPE_LONGLINK: Promise<any>
	let GNUTYPE_SPARSE: Promise<any>
	let XHDTYPE: Promise<any>
	let XGLTYPE: Promise<any>
	let SOLARIS_XHDTYPE: Promise<any>
	let USTAR_FORMAT: Promise<any>
	let GNU_FORMAT: Promise<any>
	let PAX_FORMAT: Promise<any>
	let DEFAULT_FORMAT: Promise<any>
	let SUPPORTED_TYPES: Promise<any>
	let REGULAR_TYPES: Promise<any>
	let GNU_TYPES: Promise<any>
	let PAX_FIELDS: Promise<any>
	let PAX_NAME_FIELDS: Promise<any>
	let PAX_NUMBER_FIELDS: Promise<any>
	let ENCODING: Promise<any>
}
declare module threading {
	var _

	/**
	 * Set a profile function for all threads started from the threading module.
	 * 
	 *     The func will be passed to sys.setprofile() for each thread, before its
	 *     run() method is called.
	 * 
	 *     
	 */
	function setprofile(func): Promise<any>
	function setprofile$({ func }): Promise<any>

	/**
	 * Get the profiler function as set by threading.setprofile().
	 */
	function getprofile(): Promise<any>
	function getprofile$($: {}): Promise<any>

	/**
	 * Set a trace function for all threads started from the threading module.
	 * 
	 *     The func will be passed to sys.settrace() for each thread, before its run()
	 *     method is called.
	 * 
	 *     
	 */
	function settrace(func): Promise<any>
	function settrace$({ func }): Promise<any>

	/**
	 * Get the trace function as set by threading.settrace().
	 */
	function gettrace(): Promise<any>
	function gettrace$($: {}): Promise<any>

	/**
	 * Factory function that returns a new reentrant lock.
	 * 
	 *     A reentrant lock must be released by the thread that acquired it. Once a
	 *     thread has acquired a reentrant lock, the same thread may acquire it again
	 *     without blocking; the thread must release it once for each time it has
	 *     acquired it.
	 * 
	 *     
	 */
	function RLock(): Promise<any>
	function RLock$($: {}): Promise<any>

	/**
	 * Return the current Thread object, corresponding to the caller's thread of control.
	 * 
	 *     If the caller's thread of control was not created through the threading
	 *     module, a dummy thread object with limited functionality is returned.
	 * 
	 *     
	 */
	function current_thread(): Promise<any>
	function current_thread$($: {}): Promise<any>

	/**
	 * Return the current Thread object, corresponding to the caller's thread of control.
	 * 
	 *     This function is deprecated, use current_thread() instead.
	 * 
	 *     
	 */
	function currentThread(): Promise<any>
	function currentThread$($: {}): Promise<any>

	/**
	 * Return the number of Thread objects currently alive.
	 * 
	 *     The returned count is equal to the length of the list returned by
	 *     enumerate().
	 * 
	 *     
	 */
	function active_count(): Promise<any>
	function active_count$($: {}): Promise<any>

	/**
	 * Return the number of Thread objects currently alive.
	 * 
	 *     This function is deprecated, use active_count() instead.
	 * 
	 *     
	 */
	function activeCount(): Promise<any>
	function activeCount$($: {}): Promise<any>

	/**
	 * Return a list of all Thread objects currently alive.
	 * 
	 *     The list includes daemonic threads, dummy thread objects created by
	 *     current_thread(), and the main thread. It excludes terminated threads and
	 *     threads that have not yet been started.
	 * 
	 *     
	 */
	function enumerate(): Promise<any>
	function enumerate$($: {}): Promise<any>

	/**
	 * Return the main thread object.
	 * 
	 *     In normal conditions, the main thread is the thread from which the
	 *     Python interpreter was started.
	 *     
	 */
	function main_thread(): Promise<any>
	function main_thread$($: {}): Promise<any>

	/**
	 * This class implements reentrant lock objects.
	 * 
	 *     A reentrant lock must be released by the thread that acquired it. Once a
	 *     thread has acquired a reentrant lock, the same thread may acquire it
	 *     again without blocking; the thread must release it once for each time it
	 *     has acquired it.
	 * 
	 *     
	 */
	interface I_RLock {

		/**
		 * Acquire a lock, blocking or non-blocking.
		 * 
		 *         When invoked without arguments: if this thread already owns the lock,
		 *         increment the recursion level by one, and return immediately. Otherwise,
		 *         if another thread owns the lock, block until the lock is unlocked. Once
		 *         the lock is unlocked (not owned by any thread), then grab ownership, set
		 *         the recursion level to one, and return. If more than one thread is
		 *         blocked waiting until the lock is unlocked, only one at a time will be
		 *         able to grab ownership of the lock. There is no return value in this
		 *         case.
		 * 
		 *         When invoked with the blocking argument set to true, do the same thing
		 *         as when called without arguments, and return true.
		 * 
		 *         When invoked with the blocking argument set to false, do not block. If a
		 *         call without an argument would block, return false immediately;
		 *         otherwise, do the same thing as when called without arguments, and
		 *         return true.
		 * 
		 *         When invoked with the floating-point timeout argument set to a positive
		 *         value, block for at most the number of seconds specified by timeout
		 *         and as long as the lock cannot be acquired.  Return true if the lock has
		 *         been acquired, false if the timeout has elapsed.
		 * 
		 *         
		 */
		acquire(blocking?: boolean, timeout?): Promise<any>
		acquire$({ blocking, timeout }: { blocking?, timeout?}): Promise<any>

		/**
		 * Release a lock, decrementing the recursion level.
		 * 
		 *         If after the decrement it is zero, reset the lock to unlocked (not owned
		 *         by any thread), and if any other threads are blocked waiting for the
		 *         lock to become unlocked, allow exactly one of them to proceed. If after
		 *         the decrement the recursion level is still nonzero, the lock remains
		 *         locked and owned by the calling thread.
		 * 
		 *         Only call this method when the calling thread owns the lock. A
		 *         RuntimeError is raised if this method is called when the lock is
		 *         unlocked.
		 * 
		 *         There is no return value.
		 * 
		 *         
		 */
		release(): Promise<any>
		release$($: {}): Promise<any>
	}

	/**
	 * Class that implements a condition variable.
	 * 
	 *     A condition variable allows one or more threads to wait until they are
	 *     notified by another thread.
	 * 
	 *     If the lock argument is given and not None, it must be a Lock or RLock
	 *     object, and it is used as the underlying lock. Otherwise, a new RLock object
	 *     is created and used as the underlying lock.
	 * 
	 *     
	 */
	function Condition(lock?): Promise<ICondition>
	function Condition$({ lock }: { lock?}): Promise<ICondition>
	interface ICondition {

		/**
		 * Wait until notified or until a timeout occurs.
		 * 
		 *         If the calling thread has not acquired the lock when this method is
		 *         called, a RuntimeError is raised.
		 * 
		 *         This method releases the underlying lock, and then blocks until it is
		 *         awakened by a notify() or notify_all() call for the same condition
		 *         variable in another thread, or until the optional timeout occurs. Once
		 *         awakened or timed out, it re-acquires the lock and returns.
		 * 
		 *         When the timeout argument is present and not None, it should be a
		 *         floating point number specifying a timeout for the operation in seconds
		 *         (or fractions thereof).
		 * 
		 *         When the underlying lock is an RLock, it is not released using its
		 *         release() method, since this may not actually unlock the lock when it
		 *         was acquired multiple times recursively. Instead, an internal interface
		 *         of the RLock class is used, which really unlocks it even when it has
		 *         been recursively acquired several times. Another internal interface is
		 *         then used to restore the recursion level when the lock is reacquired.
		 * 
		 *         
		 */
		wait(timeout?): Promise<any>
		wait$({ timeout }: { timeout?}): Promise<any>

		/**
		 * Wait until a condition evaluates to True.
		 * 
		 *         predicate should be a callable which result will be interpreted as a
		 *         boolean value.  A timeout may be provided giving the maximum time to
		 *         wait.
		 * 
		 *         
		 */
		wait_for(predicate, timeout?): Promise<any>
		wait_for$({ predicate, timeout }: { predicate, timeout?}): Promise<any>

		/**
		 * Wake up one or more threads waiting on this condition, if any.
		 * 
		 *         If the calling thread has not acquired the lock when this method is
		 *         called, a RuntimeError is raised.
		 * 
		 *         This method wakes up at most n of the threads waiting for the condition
		 *         variable; it is a no-op if no threads are waiting.
		 * 
		 *         
		 */
		notify(n?): Promise<any>
		notify$({ n }: { n?}): Promise<any>

		/**
		 * Wake up all threads waiting on this condition.
		 * 
		 *         If the calling thread has not acquired the lock when this method
		 *         is called, a RuntimeError is raised.
		 * 
		 *         
		 */
		notify_all(): Promise<any>
		notify_all$($: {}): Promise<any>

		/**
		 * Wake up all threads waiting on this condition.
		 * 
		 *         This method is deprecated, use notify_all() instead.
		 * 
		 *         
		 */
		notifyAll(): Promise<any>
		notifyAll$($: {}): Promise<any>
	}

	/**
	 * This class implements semaphore objects.
	 * 
	 *     Semaphores manage a counter representing the number of release() calls minus
	 *     the number of acquire() calls, plus an initial value. The acquire() method
	 *     blocks if necessary until it can return without making the counter
	 *     negative. If not given, value defaults to 1.
	 * 
	 *     
	 */
	function Semaphore(value?): Promise<ISemaphore>
	function Semaphore$({ value }: { value?}): Promise<ISemaphore>
	interface ISemaphore {

		/**
		 * Acquire a semaphore, decrementing the internal counter by one.
		 * 
		 *         When invoked without arguments: if the internal counter is larger than
		 *         zero on entry, decrement it by one and return immediately. If it is zero
		 *         on entry, block, waiting until some other thread has called release() to
		 *         make it larger than zero. This is done with proper interlocking so that
		 *         if multiple acquire() calls are blocked, release() will wake exactly one
		 *         of them up. The implementation may pick one at random, so the order in
		 *         which blocked threads are awakened should not be relied on. There is no
		 *         return value in this case.
		 * 
		 *         When invoked with blocking set to true, do the same thing as when called
		 *         without arguments, and return true.
		 * 
		 *         When invoked with blocking set to false, do not block. If a call without
		 *         an argument would block, return false immediately; otherwise, do the
		 *         same thing as when called without arguments, and return true.
		 * 
		 *         When invoked with a timeout other than None, it will block for at
		 *         most timeout seconds.  If acquire does not complete successfully in
		 *         that interval, return false.  Return true otherwise.
		 * 
		 *         
		 */
		acquire(blocking?: boolean, timeout?): Promise<any>
		acquire$({ blocking, timeout }: { blocking?, timeout?}): Promise<any>

		/**
		 * Release a semaphore, incrementing the internal counter by one or more.
		 * 
		 *         When the counter is zero on entry and another thread is waiting for it
		 *         to become larger than zero again, wake up that thread.
		 * 
		 *         
		 */
		release(n?): Promise<any>
		release$({ n }: { n?}): Promise<any>
	}

	/**
	 * Implements a bounded semaphore.
	 * 
	 *     A bounded semaphore checks to make sure its current value doesn't exceed its
	 *     initial value. If it does, ValueError is raised. In most situations
	 *     semaphores are used to guard resources with limited capacity.
	 * 
	 *     If the semaphore is released too many times it's a sign of a bug. If not
	 *     given, value defaults to 1.
	 * 
	 *     Like regular semaphores, bounded semaphores manage a counter representing
	 *     the number of release() calls minus the number of acquire() calls, plus an
	 *     initial value. The acquire() method blocks if necessary until it can return
	 *     without making the counter negative. If not given, value defaults to 1.
	 * 
	 *     
	 */
	function BoundedSemaphore(value?): Promise<IBoundedSemaphore>
	function BoundedSemaphore$({ value }: { value?}): Promise<IBoundedSemaphore>
	interface IBoundedSemaphore extends ISemaphore {

		/**
		 * Release a semaphore, incrementing the internal counter by one or more.
		 * 
		 *         When the counter is zero on entry and another thread is waiting for it
		 *         to become larger than zero again, wake up that thread.
		 * 
		 *         If the number of releases exceeds the number of acquires,
		 *         raise a ValueError.
		 * 
		 *         
		 */
		release(n?): Promise<any>
		release$({ n }: { n?}): Promise<any>
	}

	/**
	 * Class implementing event objects.
	 * 
	 *     Events manage a flag that can be set to true with the set() method and reset
	 *     to false with the clear() method. The wait() method blocks until the flag is
	 *     true.  The flag is initially false.
	 * 
	 *     
	 */
	function Event(): Promise<IEvent>
	function Event$({ }): Promise<IEvent>
	interface IEvent {

		/**
		 * Return true if and only if the internal flag is true.
		 */
		is_set(): Promise<any>
		is_set$($: {}): Promise<any>

		/**
		 * Return true if and only if the internal flag is true.
		 * 
		 *         This method is deprecated, use notify_all() instead.
		 * 
		 *         
		 */
		isSet(): Promise<any>
		isSet$($: {}): Promise<any>

		/**
		 * Set the internal flag to true.
		 * 
		 *         All threads waiting for it to become true are awakened. Threads
		 *         that call wait() once the flag is true will not block at all.
		 * 
		 *         
		 */
		set(): Promise<any>
		set$($: {}): Promise<any>

		/**
		 * Reset the internal flag to false.
		 * 
		 *         Subsequently, threads calling wait() will block until set() is called to
		 *         set the internal flag to true again.
		 * 
		 *         
		 */
		clear(): Promise<any>
		clear$($: {}): Promise<any>

		/**
		 * Block until the internal flag is true.
		 * 
		 *         If the internal flag is true on entry, return immediately. Otherwise,
		 *         block until another thread calls set() to set the flag to true, or until
		 *         the optional timeout occurs.
		 * 
		 *         When the timeout argument is present and not None, it should be a
		 *         floating point number specifying a timeout for the operation in seconds
		 *         (or fractions thereof).
		 * 
		 *         This method returns the internal flag on exit, so it will always return
		 *         True except if a timeout is given and the operation times out.
		 * 
		 *         
		 */
		wait(timeout?): Promise<any>
		wait$({ timeout }: { timeout?}): Promise<any>
	}

	/**
	 * Implements a Barrier.
	 * 
	 *     Useful for synchronizing a fixed number of threads at known synchronization
	 *     points.  Threads block on 'wait()' and are simultaneously awoken once they
	 *     have all made that call.
	 * 
	 *     
	 */

	/**
	 * Create a barrier, initialised to 'parties' threads.
	 * 
	 *         'action' is a callable which, when supplied, will be called by one of
	 *         the threads after they have all entered the barrier and just prior to
	 *         releasing them all. If a 'timeout' is provided, it is used as the
	 *         default for all subsequent 'wait()' calls.
	 * 
	 *         
	 */
	function Barrier(parties, action?, timeout?): Promise<IBarrier>
	function Barrier$({ parties, action, timeout }: { parties, action?, timeout?}): Promise<IBarrier>
	interface IBarrier {

		/**
		 * Wait for the barrier.
		 * 
		 *         When the specified number of threads have started waiting, they are all
		 *         simultaneously awoken. If an 'action' was provided for the barrier, one
		 *         of the threads will have executed that callback prior to returning.
		 *         Returns an individual index number from 0 to 'parties-1'.
		 * 
		 *         
		 */
		wait(timeout?): Promise<any>
		wait$({ timeout }: { timeout?}): Promise<any>

		/**
		 * Reset the barrier to the initial state.
		 * 
		 *         Any threads currently waiting will get the BrokenBarrier exception
		 *         raised.
		 * 
		 *         
		 */
		reset(): Promise<any>
		reset$($: {}): Promise<any>

		/**
		 * Place the barrier into a 'broken' state.
		 * 
		 *         Useful in case of error.  Any currently waiting threads and threads
		 *         attempting to 'wait()' will have BrokenBarrierError raised.
		 * 
		 *         
		 */
		abort(): Promise<any>
		abort$($: {}): Promise<any>

		/**
		 * Return the number of threads required to trip the barrier.
		 */
		parties(): Promise<any>
		parties$($: {}): Promise<any>

		/**
		 * Return the number of threads currently waiting at the barrier.
		 */
		n_waiting(): Promise<any>
		n_waiting$($: {}): Promise<any>

		/**
		 * Return True if the barrier is in a broken state.
		 */
		broken(): Promise<any>
		broken$($: {}): Promise<any>
	}
	interface IBrokenBarrierError {
	}

	/**
	 * A class that represents a thread of control.
	 * 
	 *     This class can be safely subclassed in a limited fashion. There are two ways
	 *     to specify the activity: by passing a callable object to the constructor, or
	 *     by overriding the run() method in a subclass.
	 * 
	 *     
	 */

	/**
	 * This constructor should always be called with keyword arguments. Arguments are:
	 * 
	 *         *group* should be None; reserved for future extension when a ThreadGroup
	 *         class is implemented.
	 * 
	 *         *target* is the callable object to be invoked by the run()
	 *         method. Defaults to None, meaning nothing is called.
	 * 
	 *         *name* is the thread name. By default, a unique name is constructed of
	 *         the form "Thread-N" where N is a small decimal number.
	 * 
	 *         *args* is the argument tuple for the target invocation. Defaults to ().
	 * 
	 *         *kwargs* is a dictionary of keyword arguments for the target
	 *         invocation. Defaults to {}.
	 * 
	 *         If a subclass overrides the constructor, it must make sure to invoke
	 *         the base class constructor (Thread.__init__()) before doing anything
	 *         else to the thread.
	 * 
	 *         
	 */
	function Thread(group?, target?, name?, args?, kwargs?): Promise<IThread>
	function Thread$({ group, target, name, args, kwargs }: { group?, target?, name?, args?, kwargs?}): Promise<IThread>
	interface IThread {

		/**
		 * Start the thread's activity.
		 * 
		 *         It must be called at most once per thread object. It arranges for the
		 *         object's run() method to be invoked in a separate thread of control.
		 * 
		 *         This method will raise a RuntimeError if called more than once on the
		 *         same thread object.
		 * 
		 *         
		 */
		start(): Promise<any>
		start$($: {}): Promise<any>

		/**
		 * Method representing the thread's activity.
		 * 
		 *         You may override this method in a subclass. The standard run() method
		 *         invokes the callable object passed to the object's constructor as the
		 *         target argument, if any, with sequential and keyword arguments taken
		 *         from the args and kwargs arguments, respectively.
		 * 
		 *         
		 */
		run(): Promise<any>
		run$($: {}): Promise<any>

		/**
		 * Wait until the thread terminates.
		 * 
		 *         This blocks the calling thread until the thread whose join() method is
		 *         called terminates -- either normally or through an unhandled exception
		 *         or until the optional timeout occurs.
		 * 
		 *         When the timeout argument is present and not None, it should be a
		 *         floating point number specifying a timeout for the operation in seconds
		 *         (or fractions thereof). As join() always returns None, you must call
		 *         is_alive() after join() to decide whether a timeout happened -- if the
		 *         thread is still alive, the join() call timed out.
		 * 
		 *         When the timeout argument is not present or None, the operation will
		 *         block until the thread terminates.
		 * 
		 *         A thread can be join()ed many times.
		 * 
		 *         join() raises a RuntimeError if an attempt is made to join the current
		 *         thread as that would cause a deadlock. It is also an error to join() a
		 *         thread before it has been started and attempts to do so raises the same
		 *         exception.
		 * 
		 *         
		 */
		join(timeout?): Promise<any>
		join$({ timeout }: { timeout?}): Promise<any>

		/**
		 * A string used for identification purposes only.
		 * 
		 *         It has no semantics. Multiple threads may be given the same name. The
		 *         initial name is set by the constructor.
		 * 
		 *         
		 */
		name(): Promise<any>
		name$($: {}): Promise<any>
		name(name): Promise<any>
		name$({ name }): Promise<any>

		/**
		 * Thread identifier of this thread or None if it has not been started.
		 * 
		 *         This is a nonzero integer. See the get_ident() function. Thread
		 *         identifiers may be recycled when a thread exits and another thread is
		 *         created. The identifier is available even after the thread has exited.
		 * 
		 *         
		 */
		ident(): Promise<any>
		ident$($: {}): Promise<any>

		/**
		 * Return whether the thread is alive.
		 * 
		 *         This method returns True just before the run() method starts until just
		 *         after the run() method terminates. See also the module function
		 *         enumerate().
		 * 
		 *         
		 */
		is_alive(): Promise<any>
		is_alive$($: {}): Promise<any>

		/**
		 * A boolean value indicating whether this thread is a daemon thread.
		 * 
		 *         This must be set before start() is called, otherwise RuntimeError is
		 *         raised. Its initial value is inherited from the creating thread; the
		 *         main thread is not a daemon thread and therefore all threads created in
		 *         the main thread default to daemon = False.
		 * 
		 *         The entire Python program exits when only daemon threads are left.
		 * 
		 *         
		 */
		daemon(): Promise<any>
		daemon$($: {}): Promise<any>
		daemon(daemonic): Promise<any>
		daemon$({ daemonic }): Promise<any>

		/**
		 * Return whether this thread is a daemon.
		 * 
		 *         This method is deprecated, use the daemon attribute instead.
		 * 
		 *         
		 */
		isDaemon(): Promise<any>
		isDaemon$($: {}): Promise<any>

		/**
		 * Set whether this thread is a daemon.
		 * 
		 *         This method is deprecated, use the .daemon property instead.
		 * 
		 *         
		 */
		setDaemon(daemonic): Promise<any>
		setDaemon$({ daemonic }): Promise<any>

		/**
		 * Return a string used for identification purposes only.
		 * 
		 *         This method is deprecated, use the name attribute instead.
		 * 
		 *         
		 */
		getName(): Promise<any>
		getName$($: {}): Promise<any>

		/**
		 * Set the name string for this thread.
		 * 
		 *         This method is deprecated, use the name attribute instead.
		 * 
		 *         
		 */
		setName(name): Promise<any>
		setName$({ name }): Promise<any>
	}

	/**
	 * Call a function after a specified number of seconds:
	 * 
	 *             t = Timer(30.0, f, args=None, kwargs=None)
	 *             t.start()
	 *             t.cancel()     # stop the timer's action if it's still waiting
	 * 
	 *     
	 */
	function Timer(interval, func, args?, kwargs?): Promise<ITimer>
	function Timer$({ interval, func, args, kwargs }: { interval, func, args?, kwargs?}): Promise<ITimer>
	interface ITimer extends IThread {

		/**
		 * Stop the timer if it hasn't finished yet.
		 */
		cancel(): Promise<any>
		cancel$($: {}): Promise<any>
		run(): Promise<any>
		run$($: {}): Promise<any>
	}
	interface I_MainThread extends IThread {
	}
	interface I_DummyThread extends IThread {
		is_alive(): Promise<any>
		is_alive$($: {}): Promise<any>
		join(timeout?): Promise<any>
		join$({ timeout }: { timeout?}): Promise<any>
	}
	let get_ident: Promise<any>
	let get_native_id: Promise<any>
	let ThreadError: Promise<any>
	let TIMEOUT_MAX: Promise<any>
	let Lock: Promise<any>
}
declare module tkinter {
	var _

	/**
	 * Inhibit setting of default root window.
	 * 
	 *     Call this function to inhibit that the first instance of
	 *     Tk is used for windows without an explicit parent window.
	 *     
	 */
	function NoDefaultRoot(): Promise<any>
	function NoDefaultRoot$($: {}): Promise<any>

	/**
	 * Run the main loop of Tcl.
	 */
	function mainloop(n?): Promise<any>
	function mainloop$({ n }: { n?}): Promise<any>

	/**
	 * Convert Tcl object to True or False.
	 */
	function getboolean(s): Promise<any>
	function getboolean$({ s }): Promise<any>
	function Tcl(screenName?, baseName?, className?, useTk?: boolean): Promise<any>
	function Tcl$({ screenName, baseName, className, useTk }: { screenName?, baseName?, className?, useTk?}): Promise<any>
	function image_names(): Promise<any>
	function image_names$($: {}): Promise<any>
	function image_types(): Promise<any>
	function image_types$($: {}): Promise<any>
	interface IEventType {
		KeyPress
		Key
		KeyRelease
		ButtonPress
		Button
		ButtonRelease
		Motion
		Enter
		Leave
		FocusIn
		FocusOut
		Keymap
		Expose
		GraphicsExpose
		NoExpose
		Visibility
		Create
		Destroy
		Unmap
		Map
		MapRequest
		Reparent
		Configure
		ConfigureRequest
		Gravity
		ResizeRequest
		Circulate
		CirculateRequest
		Property
		SelectionClear
		SelectionRequest
		Selection
		Colormap
		ClientMessage
		Mapping
		VirtualEvent
		Activate
		Deactivate
		MouseWheel
	}

	/**
	 * Container for the properties of an event.
	 * 
	 *     Instances of this type are generated if one of the following events occurs:
	 * 
	 *     KeyPress, KeyRelease - for keyboard events
	 *     ButtonPress, ButtonRelease, Motion, Enter, Leave, MouseWheel - for mouse events
	 *     Visibility, Unmap, Map, Expose, FocusIn, FocusOut, Circulate,
	 *     Colormap, Gravity, Reparent, Property, Destroy, Activate,
	 *     Deactivate - for window events.
	 * 
	 *     If a callback function for one of these events is registered
	 *     using bind, bind_all, bind_class, or tag_bind, the callback is
	 *     called with an Event as first argument. It will have the
	 *     following attributes (in braces are the event types for which
	 *     the attribute is valid):
	 * 
	 *         serial - serial number of event
	 *     num - mouse button pressed (ButtonPress, ButtonRelease)
	 *     focus - whether the window has the focus (Enter, Leave)
	 *     height - height of the exposed window (Configure, Expose)
	 *     width - width of the exposed window (Configure, Expose)
	 *     keycode - keycode of the pressed key (KeyPress, KeyRelease)
	 *     state - state of the event as a number (ButtonPress, ButtonRelease,
	 *                             Enter, KeyPress, KeyRelease,
	 *                             Leave, Motion)
	 *     state - state as a string (Visibility)
	 *     time - when the event occurred
	 *     x - x-position of the mouse
	 *     y - y-position of the mouse
	 *     x_root - x-position of the mouse on the screen
	 *              (ButtonPress, ButtonRelease, KeyPress, KeyRelease, Motion)
	 *     y_root - y-position of the mouse on the screen
	 *              (ButtonPress, ButtonRelease, KeyPress, KeyRelease, Motion)
	 *     char - pressed character (KeyPress, KeyRelease)
	 *     send_event - see X/Windows documentation
	 *     keysym - keysym of the event as a string (KeyPress, KeyRelease)
	 *     keysym_num - keysym of the event as a number (KeyPress, KeyRelease)
	 *     type - type of the event as a number
	 *     widget - widget in which the event occurred
	 *     delta - delta of wheel movement (MouseWheel)
	 *     
	 */
	interface IEvent {
	}

	/**
	 * Class to define value holders for e.g. buttons.
	 * 
	 *     Subclasses StringVar, IntVar, DoubleVar, BooleanVar are specializations
	 *     that constrain the type of the value returned from get().
	 */

	/**
	 * Construct a variable
	 * 
	 *         MASTER can be given as master widget.
	 *         VALUE is an optional value (defaults to "")
	 *         NAME is an optional Tcl name (defaults to PY_VARnum).
	 * 
	 *         If NAME matches an existing variable and VALUE is omitted
	 *         then the existing value is retained.
	 *         
	 */
	function Variable(master?, value?, name?): Promise<IVariable>
	function Variable$({ master, value, name }: { master?, value?, name?}): Promise<IVariable>
	interface IVariable {

		/**
		 * Set the variable to VALUE.
		 */
		set(value): Promise<any>
		set$({ value }): Promise<any>

		/**
		 * Return value of variable.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>

		/**
		 * Define a trace callback for the variable.
		 * 
		 *         Mode is one of "read", "write", "unset", or a list or tuple of
		 *         such strings.
		 *         Callback must be a function which is called when the variable is
		 *         read, written or unset.
		 * 
		 *         Return the name of the callback.
		 *         
		 */
		trace_add(mode, callback): Promise<any>
		trace_add$({ mode, callback }): Promise<any>

		/**
		 * Delete the trace callback for a variable.
		 * 
		 *         Mode is one of "read", "write", "unset" or a list or tuple of
		 *         such strings.  Must be same as were specified in trace_add().
		 *         cbname is the name of the callback returned from trace_add().
		 *         
		 */
		trace_remove(mode, cbname): Promise<any>
		trace_remove$({ mode, cbname }): Promise<any>

		/**
		 * Return all trace callback information.
		 */
		trace_info(): Promise<any>
		trace_info$($: {}): Promise<any>

		/**
		 * Define a trace callback for the variable.
		 * 
		 *         MODE is one of "r", "w", "u" for read, write, undefine.
		 *         CALLBACK must be a function which is called when
		 *         the variable is read, written or undefined.
		 * 
		 *         Return the name of the callback.
		 * 
		 *         This deprecated method wraps a deprecated Tcl method that will
		 *         likely be removed in the future.  Use trace_add() instead.
		 *         
		 */
		trace_variable(mode, callback): Promise<any>
		trace_variable$({ mode, callback }): Promise<any>

		/**
		 * Delete the trace callback for a variable.
		 * 
		 *         MODE is one of "r", "w", "u" for read, write, undefine.
		 *         CBNAME is the name of the callback returned from trace_variable or trace.
		 * 
		 *         This deprecated method wraps a deprecated Tcl method that will
		 *         likely be removed in the future.  Use trace_remove() instead.
		 *         
		 */
		trace_vdelete(mode, cbname): Promise<any>
		trace_vdelete$({ mode, cbname }): Promise<any>

		/**
		 * Return all trace callback information.
		 * 
		 *         This deprecated method wraps a deprecated Tcl method that will
		 *         likely be removed in the future.  Use trace_info() instead.
		 *         
		 */
		trace_vinfo(): Promise<any>
		trace_vinfo$($: {}): Promise<any>
		initialize
		trace
	}

	/**
	 * Value holder for strings variables.
	 */

	/**
	 * Construct a string variable.
	 * 
	 *         MASTER can be given as master widget.
	 *         VALUE is an optional value (defaults to "")
	 *         NAME is an optional Tcl name (defaults to PY_VARnum).
	 * 
	 *         If NAME matches an existing variable and VALUE is omitted
	 *         then the existing value is retained.
	 *         
	 */
	function StringVar(master?, value?, name?): Promise<IStringVar>
	function StringVar$({ master, value, name }: { master?, value?, name?}): Promise<IStringVar>
	interface IStringVar extends IVariable {

		/**
		 * Return value of variable as string.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>
	}

	/**
	 * Value holder for integer variables.
	 */

	/**
	 * Construct an integer variable.
	 * 
	 *         MASTER can be given as master widget.
	 *         VALUE is an optional value (defaults to 0)
	 *         NAME is an optional Tcl name (defaults to PY_VARnum).
	 * 
	 *         If NAME matches an existing variable and VALUE is omitted
	 *         then the existing value is retained.
	 *         
	 */
	function IntVar(master?, value?, name?): Promise<IIntVar>
	function IntVar$({ master, value, name }: { master?, value?, name?}): Promise<IIntVar>
	interface IIntVar extends IVariable {

		/**
		 * Return the value of the variable as an integer.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>
	}

	/**
	 * Value holder for float variables.
	 */

	/**
	 * Construct a float variable.
	 * 
	 *         MASTER can be given as master widget.
	 *         VALUE is an optional value (defaults to 0.0)
	 *         NAME is an optional Tcl name (defaults to PY_VARnum).
	 * 
	 *         If NAME matches an existing variable and VALUE is omitted
	 *         then the existing value is retained.
	 *         
	 */
	function DoubleVar(master?, value?, name?): Promise<IDoubleVar>
	function DoubleVar$({ master, value, name }: { master?, value?, name?}): Promise<IDoubleVar>
	interface IDoubleVar extends IVariable {

		/**
		 * Return the value of the variable as a float.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>
	}

	/**
	 * Value holder for boolean variables.
	 */

	/**
	 * Construct a boolean variable.
	 * 
	 *         MASTER can be given as master widget.
	 *         VALUE is an optional value (defaults to False)
	 *         NAME is an optional Tcl name (defaults to PY_VARnum).
	 * 
	 *         If NAME matches an existing variable and VALUE is omitted
	 *         then the existing value is retained.
	 *         
	 */
	function BooleanVar(master?, value?, name?): Promise<IBooleanVar>
	function BooleanVar$({ master, value, name }: { master?, value?, name?}): Promise<IBooleanVar>
	interface IBooleanVar extends IVariable {

		/**
		 * Set the variable to VALUE.
		 */
		set(value): Promise<any>
		set$({ value }): Promise<any>

		/**
		 * Return the value of the variable as a bool.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>
	}

	/**
	 * Internal class.
	 * 
	 *     Base class which defines methods common for interior widgets.
	 */
	interface IMisc {

		/**
		 * Internal function.
		 * 
		 *         Delete all Tcl commands created for
		 *         this widget in the Tcl interpreter.
		 */
		destroy(): Promise<any>
		destroy$($: {}): Promise<any>

		/**
		 * Internal function.
		 * 
		 *         Delete the Tcl command provided in NAME.
		 */
		deletecommand(name): Promise<any>
		deletecommand$({ name }): Promise<any>

		/**
		 * Set Tcl internal variable, whether the look and feel
		 *         should adhere to Motif.
		 * 
		 *         A parameter of 1 means adhere to Motif (e.g. no color
		 *         change if mouse passes over slider).
		 *         Returns the set value.
		 */
		tk_strictMotif(boolean?): Promise<any>
		tk_strictMotif$({ boolean }: { boolean?}): Promise<any>

		/**
		 * Change the color scheme to light brown as used in Tk 3.6 and before.
		 */
		tk_bisque(): Promise<any>
		tk_bisque$($: {}): Promise<any>

		/**
		 * Set a new color scheme for all widget elements.
		 * 
		 *         A single color as argument will cause that all colors of Tk
		 *         widget elements are derived from this.
		 *         Alternatively several keyword parameters and its associated
		 *         colors can be given. The following keywords are valid:
		 *         activeBackground, foreground, selectColor,
		 *         activeForeground, highlightBackground, selectBackground,
		 *         background, highlightColor, selectForeground,
		 *         disabledForeground, insertBackground, troughColor.
		 */
		tk_setPalette(): Promise<any>
		tk_setPalette$($: {}): Promise<any>

		/**
		 * Wait until the variable is modified.
		 * 
		 *         A parameter of type IntVar, StringVar, DoubleVar or
		 *         BooleanVar must be given.
		 */
		wait_variable(name?): Promise<any>
		wait_variable$({ name }: { name?}): Promise<any>

		/**
		 * Wait until a WIDGET is destroyed.
		 * 
		 *         If no parameter is given self is used.
		 */
		wait_window(window?): Promise<any>
		wait_window$({ window }: { window?}): Promise<any>

		/**
		 * Wait until the visibility of a WIDGET changes
		 *         (e.g. it appears).
		 * 
		 *         If no parameter is given self is used.
		 */
		wait_visibility(window?): Promise<any>
		wait_visibility$({ window }: { window?}): Promise<any>

		/**
		 * Set Tcl variable NAME to VALUE.
		 */
		setvar(name?, value?): Promise<any>
		setvar$({ name, value }: { name?, value?}): Promise<any>

		/**
		 * Return value of Tcl variable NAME.
		 */
		getvar(name?): Promise<any>
		getvar$({ name }: { name?}): Promise<any>
		getint(s): Promise<any>
		getint$({ s }): Promise<any>
		getdouble(s): Promise<any>
		getdouble$({ s }): Promise<any>

		/**
		 * Return a boolean value for Tcl boolean values true and false given as parameter.
		 */
		getboolean(s): Promise<any>
		getboolean$({ s }): Promise<any>

		/**
		 * Direct input focus to this widget.
		 * 
		 *         If the application currently does not have the focus
		 *         this widget will get the focus if the application gets
		 *         the focus through the window manager.
		 */
		focus_set(): Promise<any>
		focus_set$($: {}): Promise<any>

		/**
		 * Direct input focus to this widget even if the
		 *         application does not have the focus. Use with
		 *         caution!
		 */
		focus_force(): Promise<any>
		focus_force$($: {}): Promise<any>

		/**
		 * Return the widget which has currently the focus in the
		 *         application.
		 * 
		 *         Use focus_displayof to allow working with several
		 *         displays. Return None if application does not have
		 *         the focus.
		 */
		focus_get(): Promise<any>
		focus_get$($: {}): Promise<any>

		/**
		 * Return the widget which has currently the focus on the
		 *         display where this widget is located.
		 * 
		 *         Return None if the application does not have the focus.
		 */
		focus_displayof(): Promise<any>
		focus_displayof$($: {}): Promise<any>

		/**
		 * Return the widget which would have the focus if top level
		 *         for this widget gets the focus from the window manager.
		 */
		focus_lastfor(): Promise<any>
		focus_lastfor$($: {}): Promise<any>

		/**
		 * The widget under mouse will get automatically focus. Can not
		 *         be disabled easily.
		 */
		tk_focusFollowsMouse(): Promise<any>
		tk_focusFollowsMouse$($: {}): Promise<any>

		/**
		 * Return the next widget in the focus order which follows
		 *         widget which has currently the focus.
		 * 
		 *         The focus order first goes to the next child, then to
		 *         the children of the child recursively and then to the
		 *         next sibling which is higher in the stacking order.  A
		 *         widget is omitted if it has the takefocus resource set
		 *         to 0.
		 */
		tk_focusNext(): Promise<any>
		tk_focusNext$($: {}): Promise<any>

		/**
		 * Return previous widget in the focus order. See tk_focusNext for details.
		 */
		tk_focusPrev(): Promise<any>
		tk_focusPrev$($: {}): Promise<any>

		/**
		 * Call function once after given time.
		 * 
		 *         MS specifies the time in milliseconds. FUNC gives the
		 *         function which shall be called. Additional parameters
		 *         are given as parameters to the function call.  Return
		 *         identifier to cancel scheduling with after_cancel.
		 */
		after(ms, func?): Promise<any>
		after$({ ms, func }: { ms, func?}): Promise<any>

		/**
		 * Call FUNC once if the Tcl main loop has no event to
		 *         process.
		 * 
		 *         Return an identifier to cancel the scheduling with
		 *         after_cancel.
		 */
		after_idle(func): Promise<any>
		after_idle$({ func }): Promise<any>

		/**
		 * Cancel scheduling of function identified with ID.
		 * 
		 *         Identifier returned by after or after_idle must be
		 *         given as first parameter.
		 *         
		 */
		after_cancel(id): Promise<any>
		after_cancel$({ id }): Promise<any>

		/**
		 * Ring a display's bell.
		 */
		bell(displayof?): Promise<any>
		bell$({ displayof }: { displayof?}): Promise<any>

		/**
		 * Retrieve data from the clipboard on window's display.
		 * 
		 *         The window keyword defaults to the root window of the Tkinter
		 *         application.
		 * 
		 *         The type keyword specifies the form in which the data is
		 *         to be returned and should be an atom name such as STRING
		 *         or FILE_NAME.  Type defaults to STRING, except on X11, where the default
		 *         is to try UTF8_STRING and fall back to STRING.
		 * 
		 *         This command is equivalent to:
		 * 
		 *         selection_get(CLIPBOARD)
		 *         
		 */
		clipboard_get(): Promise<any>
		clipboard_get$($: {}): Promise<any>

		/**
		 * Clear the data in the Tk clipboard.
		 * 
		 *         A widget specified for the optional displayof keyword
		 *         argument specifies the target display.
		 */
		clipboard_clear(): Promise<any>
		clipboard_clear$($: {}): Promise<any>

		/**
		 * Append STRING to the Tk clipboard.
		 * 
		 *         A widget specified at the optional displayof keyword
		 *         argument specifies the target display. The clipboard
		 *         can be retrieved with selection_get.
		 */
		clipboard_append(string): Promise<any>
		clipboard_append$({ string }): Promise<any>

		/**
		 * Return widget which has currently the grab in this application
		 *         or None.
		 */
		grab_current(): Promise<any>
		grab_current$($: {}): Promise<any>

		/**
		 * Release grab for this widget if currently set.
		 */
		grab_release(): Promise<any>
		grab_release$($: {}): Promise<any>

		/**
		 * Set grab for this widget.
		 * 
		 *         A grab directs all events to this and descendant
		 *         widgets in the application.
		 */
		grab_set(): Promise<any>
		grab_set$($: {}): Promise<any>

		/**
		 * Set global grab for this widget.
		 * 
		 *         A global grab directs all events to this and
		 *         descendant widgets on the display. Use with caution -
		 *         other applications do not get events anymore.
		 */
		grab_set_global(): Promise<any>
		grab_set_global$($: {}): Promise<any>

		/**
		 * Return None, "local" or "global" if this widget has
		 *         no, a local or a global grab.
		 */
		grab_status(): Promise<any>
		grab_status$($: {}): Promise<any>

		/**
		 * Set a VALUE (second parameter) for an option
		 *         PATTERN (first parameter).
		 * 
		 *         An optional third parameter gives the numeric priority
		 *         (defaults to 80).
		 */
		option_add(pattern, value, priority?): Promise<any>
		option_add$({ pattern, value, priority }: { pattern, value, priority?}): Promise<any>

		/**
		 * Clear the option database.
		 * 
		 *         It will be reloaded if option_add is called.
		 */
		option_clear(): Promise<any>
		option_clear$($: {}): Promise<any>

		/**
		 * Return the value for an option NAME for this widget
		 *         with CLASSNAME.
		 * 
		 *         Values with higher priority override lower values.
		 */
		option_get(name, className): Promise<any>
		option_get$({ name, className }): Promise<any>

		/**
		 * Read file FILENAME into the option database.
		 * 
		 *         An optional second parameter gives the numeric
		 *         priority.
		 */
		option_readfile(fileName, priority?): Promise<any>
		option_readfile$({ fileName, priority }: { fileName, priority?}): Promise<any>

		/**
		 * Clear the current X selection.
		 */
		selection_clear(): Promise<any>
		selection_clear$($: {}): Promise<any>

		/**
		 * Return the contents of the current X selection.
		 * 
		 *         A keyword parameter selection specifies the name of
		 *         the selection and defaults to PRIMARY.  A keyword
		 *         parameter displayof specifies a widget on the display
		 *         to use. A keyword parameter type specifies the form of data to be
		 *         fetched, defaulting to STRING except on X11, where UTF8_STRING is tried
		 *         before STRING.
		 */
		selection_get(): Promise<any>
		selection_get$($: {}): Promise<any>

		/**
		 * Specify a function COMMAND to call if the X
		 *         selection owned by this widget is queried by another
		 *         application.
		 * 
		 *         This function must return the contents of the
		 *         selection. The function will be called with the
		 *         arguments OFFSET and LENGTH which allows the chunking
		 *         of very long selections. The following keyword
		 *         parameters can be provided:
		 *         selection - name of the selection (default PRIMARY),
		 *         type - type of the selection (e.g. STRING, FILE_NAME).
		 */
		selection_handle(command): Promise<any>
		selection_handle$({ command }): Promise<any>

		/**
		 * Become owner of X selection.
		 * 
		 *         A keyword parameter selection specifies the name of
		 *         the selection (default PRIMARY).
		 */
		selection_own(): Promise<any>
		selection_own$($: {}): Promise<any>

		/**
		 * Return owner of X selection.
		 * 
		 *         The following keyword parameter can
		 *         be provided:
		 *         selection - name of the selection (default PRIMARY),
		 *         type - type of the selection (e.g. STRING, FILE_NAME).
		 */
		selection_own_get(): Promise<any>
		selection_own_get$($: {}): Promise<any>

		/**
		 * Send Tcl command CMD to different interpreter INTERP to be executed.
		 */
		send(interp, cmd): Promise<any>
		send$({ interp, cmd }): Promise<any>

		/**
		 * Lower this widget in the stacking order.
		 */
		lower(belowThis?): Promise<any>
		lower$({ belowThis }: { belowThis?}): Promise<any>

		/**
		 * Raise this widget in the stacking order.
		 */
		tkraise(aboveThis?): Promise<any>
		tkraise$({ aboveThis }: { aboveThis?}): Promise<any>

		/**
		 * Return integer which represents atom NAME.
		 */
		winfo_atom(name, displayof?): Promise<any>
		winfo_atom$({ name, displayof }: { name, displayof?}): Promise<any>

		/**
		 * Return name of atom with identifier ID.
		 */
		winfo_atomname(id, displayof?): Promise<any>
		winfo_atomname$({ id, displayof }: { id, displayof?}): Promise<any>

		/**
		 * Return number of cells in the colormap for this widget.
		 */
		winfo_cells(): Promise<any>
		winfo_cells$($: {}): Promise<any>

		/**
		 * Return a list of all widgets which are children of this widget.
		 */
		winfo_children(): Promise<any>
		winfo_children$($: {}): Promise<any>

		/**
		 * Return window class name of this widget.
		 */
		winfo_class(): Promise<any>
		winfo_class$($: {}): Promise<any>

		/**
		 * Return True if at the last color request the colormap was full.
		 */
		winfo_colormapfull(): Promise<any>
		winfo_colormapfull$($: {}): Promise<any>

		/**
		 * Return the widget which is at the root coordinates ROOTX, ROOTY.
		 */
		winfo_containing(rootX, rootY, displayof?): Promise<any>
		winfo_containing$({ rootX, rootY, displayof }: { rootX, rootY, displayof?}): Promise<any>

		/**
		 * Return the number of bits per pixel.
		 */
		winfo_depth(): Promise<any>
		winfo_depth$($: {}): Promise<any>

		/**
		 * Return true if this widget exists.
		 */
		winfo_exists(): Promise<any>
		winfo_exists$($: {}): Promise<any>

		/**
		 * Return the number of pixels for the given distance NUMBER
		 *         (e.g. "3c") as float.
		 */
		winfo_fpixels(number): Promise<any>
		winfo_fpixels$({ number }): Promise<any>

		/**
		 * Return geometry string for this widget in the form "widthxheight+X+Y".
		 */
		winfo_geometry(): Promise<any>
		winfo_geometry$($: {}): Promise<any>

		/**
		 * Return height of this widget.
		 */
		winfo_height(): Promise<any>
		winfo_height$($: {}): Promise<any>

		/**
		 * Return identifier ID for this widget.
		 */
		winfo_id(): Promise<any>
		winfo_id$($: {}): Promise<any>

		/**
		 * Return the name of all Tcl interpreters for this display.
		 */
		winfo_interps(displayof?): Promise<any>
		winfo_interps$({ displayof }: { displayof?}): Promise<any>

		/**
		 * Return true if this widget is mapped.
		 */
		winfo_ismapped(): Promise<any>
		winfo_ismapped$($: {}): Promise<any>

		/**
		 * Return the window manager name for this widget.
		 */
		winfo_manager(): Promise<any>
		winfo_manager$($: {}): Promise<any>

		/**
		 * Return the name of this widget.
		 */
		winfo_name(): Promise<any>
		winfo_name$($: {}): Promise<any>

		/**
		 * Return the name of the parent of this widget.
		 */
		winfo_parent(): Promise<any>
		winfo_parent$($: {}): Promise<any>

		/**
		 * Return the pathname of the widget given by ID.
		 */
		winfo_pathname(id, displayof?): Promise<any>
		winfo_pathname$({ id, displayof }: { id, displayof?}): Promise<any>

		/**
		 * Rounded integer value of winfo_fpixels.
		 */
		winfo_pixels(number): Promise<any>
		winfo_pixels$({ number }): Promise<any>

		/**
		 * Return the x coordinate of the pointer on the root window.
		 */
		winfo_pointerx(): Promise<any>
		winfo_pointerx$($: {}): Promise<any>

		/**
		 * Return a tuple of x and y coordinates of the pointer on the root window.
		 */
		winfo_pointerxy(): Promise<any>
		winfo_pointerxy$($: {}): Promise<any>

		/**
		 * Return the y coordinate of the pointer on the root window.
		 */
		winfo_pointery(): Promise<any>
		winfo_pointery$($: {}): Promise<any>

		/**
		 * Return requested height of this widget.
		 */
		winfo_reqheight(): Promise<any>
		winfo_reqheight$($: {}): Promise<any>

		/**
		 * Return requested width of this widget.
		 */
		winfo_reqwidth(): Promise<any>
		winfo_reqwidth$($: {}): Promise<any>

		/**
		 * Return a tuple of integer RGB values in range(65536) for color in this widget.
		 */
		winfo_rgb(color): Promise<any>
		winfo_rgb$({ color }): Promise<any>

		/**
		 * Return x coordinate of upper left corner of this widget on the
		 *         root window.
		 */
		winfo_rootx(): Promise<any>
		winfo_rootx$($: {}): Promise<any>

		/**
		 * Return y coordinate of upper left corner of this widget on the
		 *         root window.
		 */
		winfo_rooty(): Promise<any>
		winfo_rooty$($: {}): Promise<any>

		/**
		 * Return the screen name of this widget.
		 */
		winfo_screen(): Promise<any>
		winfo_screen$($: {}): Promise<any>

		/**
		 * Return the number of the cells in the colormap of the screen
		 *         of this widget.
		 */
		winfo_screencells(): Promise<any>
		winfo_screencells$($: {}): Promise<any>

		/**
		 * Return the number of bits per pixel of the root window of the
		 *         screen of this widget.
		 */
		winfo_screendepth(): Promise<any>
		winfo_screendepth$($: {}): Promise<any>

		/**
		 * Return the number of pixels of the height of the screen of this widget
		 *         in pixel.
		 */
		winfo_screenheight(): Promise<any>
		winfo_screenheight$($: {}): Promise<any>

		/**
		 * Return the number of pixels of the height of the screen of
		 *         this widget in mm.
		 */
		winfo_screenmmheight(): Promise<any>
		winfo_screenmmheight$($: {}): Promise<any>

		/**
		 * Return the number of pixels of the width of the screen of
		 *         this widget in mm.
		 */
		winfo_screenmmwidth(): Promise<any>
		winfo_screenmmwidth$($: {}): Promise<any>

		/**
		 * Return one of the strings directcolor, grayscale, pseudocolor,
		 *         staticcolor, staticgray, or truecolor for the default
		 *         colormodel of this screen.
		 */
		winfo_screenvisual(): Promise<any>
		winfo_screenvisual$($: {}): Promise<any>

		/**
		 * Return the number of pixels of the width of the screen of
		 *         this widget in pixel.
		 */
		winfo_screenwidth(): Promise<any>
		winfo_screenwidth$($: {}): Promise<any>

		/**
		 * Return information of the X-Server of the screen of this widget in
		 *         the form "XmajorRminor vendor vendorVersion".
		 */
		winfo_server(): Promise<any>
		winfo_server$($: {}): Promise<any>

		/**
		 * Return the toplevel widget of this widget.
		 */
		winfo_toplevel(): Promise<any>
		winfo_toplevel$($: {}): Promise<any>

		/**
		 * Return true if the widget and all its higher ancestors are mapped.
		 */
		winfo_viewable(): Promise<any>
		winfo_viewable$($: {}): Promise<any>

		/**
		 * Return one of the strings directcolor, grayscale, pseudocolor,
		 *         staticcolor, staticgray, or truecolor for the
		 *         colormodel of this widget.
		 */
		winfo_visual(): Promise<any>
		winfo_visual$($: {}): Promise<any>

		/**
		 * Return the X identifier for the visual for this widget.
		 */
		winfo_visualid(): Promise<any>
		winfo_visualid$($: {}): Promise<any>

		/**
		 * Return a list of all visuals available for the screen
		 *         of this widget.
		 * 
		 *         Each item in the list consists of a visual name (see winfo_visual), a
		 *         depth and if includeids is true is given also the X identifier.
		 */
		winfo_visualsavailable(includeids?: boolean): Promise<any>
		winfo_visualsavailable$({ includeids }: { includeids?}): Promise<any>

		/**
		 * Return the height of the virtual root window associated with this
		 *         widget in pixels. If there is no virtual root window return the
		 *         height of the screen.
		 */
		winfo_vrootheight(): Promise<any>
		winfo_vrootheight$($: {}): Promise<any>

		/**
		 * Return the width of the virtual root window associated with this
		 *         widget in pixel. If there is no virtual root window return the
		 *         width of the screen.
		 */
		winfo_vrootwidth(): Promise<any>
		winfo_vrootwidth$($: {}): Promise<any>

		/**
		 * Return the x offset of the virtual root relative to the root
		 *         window of the screen of this widget.
		 */
		winfo_vrootx(): Promise<any>
		winfo_vrootx$($: {}): Promise<any>

		/**
		 * Return the y offset of the virtual root relative to the root
		 *         window of the screen of this widget.
		 */
		winfo_vrooty(): Promise<any>
		winfo_vrooty$($: {}): Promise<any>

		/**
		 * Return the width of this widget.
		 */
		winfo_width(): Promise<any>
		winfo_width$($: {}): Promise<any>

		/**
		 * Return the x coordinate of the upper left corner of this widget
		 *         in the parent.
		 */
		winfo_x(): Promise<any>
		winfo_x$($: {}): Promise<any>

		/**
		 * Return the y coordinate of the upper left corner of this widget
		 *         in the parent.
		 */
		winfo_y(): Promise<any>
		winfo_y$($: {}): Promise<any>

		/**
		 * Enter event loop until all pending events have been processed by Tcl.
		 */
		update(): Promise<any>
		update$($: {}): Promise<any>

		/**
		 * Enter event loop until all idle callbacks have been called. This
		 *         will update the display of windows but not process events caused by
		 *         the user.
		 */
		update_idletasks(): Promise<any>
		update_idletasks$($: {}): Promise<any>

		/**
		 * Set or get the list of bindtags for this widget.
		 * 
		 *         With no argument return the list of all bindtags associated with
		 *         this widget. With a list of strings as argument the bindtags are
		 *         set to this list. The bindtags determine in which order events are
		 *         processed (see bind).
		 */
		bindtags(tagList?): Promise<any>
		bindtags$({ tagList }: { tagList?}): Promise<any>

		/**
		 * Bind to this widget at event SEQUENCE a call to function FUNC.
		 * 
		 *         SEQUENCE is a string of concatenated event
		 *         patterns. An event pattern is of the form
		 *         <MODIFIER-MODIFIER-TYPE-DETAIL> where MODIFIER is one
		 *         of Control, Mod2, M2, Shift, Mod3, M3, Lock, Mod4, M4,
		 *         Button1, B1, Mod5, M5 Button2, B2, Meta, M, Button3,
		 *         B3, Alt, Button4, B4, Double, Button5, B5 Triple,
		 *         Mod1, M1. TYPE is one of Activate, Enter, Map,
		 *         ButtonPress, Button, Expose, Motion, ButtonRelease
		 *         FocusIn, MouseWheel, Circulate, FocusOut, Property,
		 *         Colormap, Gravity Reparent, Configure, KeyPress, Key,
		 *         Unmap, Deactivate, KeyRelease Visibility, Destroy,
		 *         Leave and DETAIL is the button number for ButtonPress,
		 *         ButtonRelease and DETAIL is the Keysym for KeyPress and
		 *         KeyRelease. Examples are
		 *         <Control-Button-1> for pressing Control and mouse button 1 or
		 *         <Alt-A> for pressing A and the Alt key (KeyPress can be omitted).
		 *         An event pattern can also be a virtual event of the form
		 *         <<AString>> where AString can be arbitrary. This
		 *         event can be generated by event_generate.
		 *         If events are concatenated they must appear shortly
		 *         after each other.
		 * 
		 *         FUNC will be called if the event sequence occurs with an
		 *         instance of Event as argument. If the return value of FUNC is
		 *         "break" no further bound function is invoked.
		 * 
		 *         An additional boolean parameter ADD specifies whether FUNC will
		 *         be called additionally to the other bound function or whether
		 *         it will replace the previous function.
		 * 
		 *         Bind will return an identifier to allow deletion of the bound function with
		 *         unbind without memory leak.
		 * 
		 *         If FUNC or SEQUENCE is omitted the bound function or list
		 *         of bound events are returned.
		 */
		bind(sequence?, func?, add?): Promise<any>
		bind$({ sequence, func, add }: { sequence?, func?, add?}): Promise<any>

		/**
		 * Unbind for this widget for event SEQUENCE  the
		 *         function identified with FUNCID.
		 */
		unbind(sequence, funcid?): Promise<any>
		unbind$({ sequence, funcid }: { sequence, funcid?}): Promise<any>

		/**
		 * Bind to all widgets at an event SEQUENCE a call to function FUNC.
		 *         An additional boolean parameter ADD specifies whether FUNC will
		 *         be called additionally to the other bound function or whether
		 *         it will replace the previous function. See bind for the return value.
		 */
		bind_all(sequence?, func?, add?): Promise<any>
		bind_all$({ sequence, func, add }: { sequence?, func?, add?}): Promise<any>

		/**
		 * Unbind for all widgets for event SEQUENCE all functions.
		 */
		unbind_all(sequence): Promise<any>
		unbind_all$({ sequence }): Promise<any>

		/**
		 * Bind to widgets with bindtag CLASSNAME at event
		 *         SEQUENCE a call of function FUNC. An additional
		 *         boolean parameter ADD specifies whether FUNC will be
		 *         called additionally to the other bound function or
		 *         whether it will replace the previous function. See bind for
		 *         the return value.
		 */
		bind_class(className, sequence?, func?, add?): Promise<any>
		bind_class$({ className, sequence, func, add }: { className, sequence?, func?, add?}): Promise<any>

		/**
		 * Unbind for all widgets with bindtag CLASSNAME for event SEQUENCE
		 *         all functions.
		 */
		unbind_class(className, sequence): Promise<any>
		unbind_class$({ className, sequence }): Promise<any>

		/**
		 * Call the mainloop of Tk.
		 */
		mainloop(n?): Promise<any>
		mainloop$({ n }: { n?}): Promise<any>

		/**
		 * Quit the Tcl interpreter. All widgets will be destroyed.
		 */
		quit(): Promise<any>
		quit$($: {}): Promise<any>

		/**
		 * Return the Tkinter instance of a widget identified by
		 *         its Tcl name NAME.
		 */
		nametowidget(name): Promise<any>
		nametowidget$({ name }): Promise<any>

		/**
		 * Configure resources of a widget.
		 * 
		 *         The values for resources are specified as keyword
		 *         arguments. To get an overview about
		 *         the allowed keyword arguments call the method keys.
		 *         
		 */
		configure(cnf?): Promise<any>
		configure$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Return the resource value for a KEY given as string.
		 */
		cget(key): Promise<any>
		cget$({ key }): Promise<any>

		/**
		 * Return a list of all resource names of this widget.
		 */
		keys(): Promise<any>
		keys$($: {}): Promise<any>

		/**
		 * Set or get the status for propagation of geometry information.
		 * 
		 *         A boolean argument specifies whether the geometry information
		 *         of the slaves will determine the size of this widget. If no argument
		 *         is given the current setting will be returned.
		 *         
		 */
		pack_propagate(flag?): Promise<any>
		pack_propagate$({ flag }: { flag?}): Promise<any>

		/**
		 * Return a list of all slaves of this widget
		 *         in its packing order.
		 */
		pack_slaves(): Promise<any>
		pack_slaves$($: {}): Promise<any>

		/**
		 * Return a list of all slaves of this widget
		 *         in its packing order.
		 */
		place_slaves(): Promise<any>
		place_slaves$($: {}): Promise<any>

		/**
		 * The anchor value controls how to place the grid within the
		 *         master when no row/column has any weight.
		 * 
		 *         The default anchor is nw.
		 */
		grid_anchor(anchor?): Promise<any>
		grid_anchor$({ anchor }: { anchor?}): Promise<any>

		/**
		 * Return a tuple of integer coordinates for the bounding
		 *         box of this widget controlled by the geometry manager grid.
		 * 
		 *         If COLUMN, ROW is given the bounding box applies from
		 *         the cell with row and column 0 to the specified
		 *         cell. If COL2 and ROW2 are given the bounding box
		 *         starts at that cell.
		 * 
		 *         The returned integers specify the offset of the upper left
		 *         corner in the master widget and the width and height.
		 *         
		 */
		grid_bbox(column?, row?, col2?, row2?): Promise<any>
		grid_bbox$({ column, row, col2, row2 }: { column?, row?, col2?, row2?}): Promise<any>

		/**
		 * Configure column INDEX of a grid.
		 * 
		 *         Valid resources are minsize (minimum size of the column),
		 *         weight (how much does additional space propagate to this column)
		 *         and pad (how much space to let additionally).
		 */
		grid_columnconfigure(index, cnf?): Promise<any>
		grid_columnconfigure$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Return a tuple of column and row which identify the cell
		 *         at which the pixel at position X and Y inside the master
		 *         widget is located.
		 */
		grid_location(x, y): Promise<any>
		grid_location$({ x, y }): Promise<any>

		/**
		 * Set or get the status for propagation of geometry information.
		 * 
		 *         A boolean argument specifies whether the geometry information
		 *         of the slaves will determine the size of this widget. If no argument
		 *         is given, the current setting will be returned.
		 *         
		 */
		grid_propagate(flag?): Promise<any>
		grid_propagate$({ flag }: { flag?}): Promise<any>

		/**
		 * Configure row INDEX of a grid.
		 * 
		 *         Valid resources are minsize (minimum size of the row),
		 *         weight (how much does additional space propagate to this row)
		 *         and pad (how much space to let additionally).
		 */
		grid_rowconfigure(index, cnf?): Promise<any>
		grid_rowconfigure$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Return a tuple of the number of column and rows in the grid.
		 */
		grid_size(): Promise<any>
		grid_size$($: {}): Promise<any>

		/**
		 * Return a list of all slaves of this widget
		 *         in its packing order.
		 */
		grid_slaves(row?, column?): Promise<any>
		grid_slaves$({ row, column }: { row?, column?}): Promise<any>

		/**
		 * Bind a virtual event VIRTUAL (of the form <<Name>>)
		 *         to an event SEQUENCE such that the virtual event is triggered
		 *         whenever SEQUENCE occurs.
		 */
		event_add(virtual): Promise<any>
		event_add$({ virtual }): Promise<any>

		/**
		 * Unbind a virtual event VIRTUAL from SEQUENCE.
		 */
		event_delete(virtual): Promise<any>
		event_delete$({ virtual }): Promise<any>

		/**
		 * Generate an event SEQUENCE. Additional
		 *         keyword arguments specify parameter of the event
		 *         (e.g. x, y, rootx, rooty).
		 */
		event_generate(sequence): Promise<any>
		event_generate$({ sequence }): Promise<any>

		/**
		 * Return a list of all virtual events or the information
		 *         about the SEQUENCE bound to the virtual event VIRTUAL.
		 */
		event_info(virtual?): Promise<any>
		event_info$({ virtual }: { virtual?}): Promise<any>

		/**
		 * Return a list of all existing image names.
		 */
		image_names(): Promise<any>
		image_names$($: {}): Promise<any>

		/**
		 * Return a list of all available image types (e.g. photo bitmap).
		 */
		image_types(): Promise<any>
		image_types$($: {}): Promise<any>
		waitvar
		focus
		lift
		register
		config
		propagate
		slaves
		anchor
		bbox
		columnconfigure
		rowconfigure
		size
	}

	/**
	 * Internal class. Stores function to call when some user
	 *     defined Tcl function is called e.g. after an event occurred.
	 */

	/**
	 * Store FUNC, SUBST and WIDGET as members.
	 */
	function CallWrapper(func, subst, widget): Promise<ICallWrapper>
	function CallWrapper$({ func, subst, widget }): Promise<ICallWrapper>
	interface ICallWrapper {
	}

	/**
	 * Mix-in class for querying and changing the horizontal position
	 *     of a widget's window.
	 */
	interface IXView {

		/**
		 * Query and change the horizontal position of the view.
		 */
		xview(): Promise<any>
		xview$($: {}): Promise<any>

		/**
		 * Adjusts the view in the window so that FRACTION of the
		 *         total width of the canvas is off-screen to the left.
		 */
		xview_moveto(fraction): Promise<any>
		xview_moveto$({ fraction }): Promise<any>

		/**
		 * Shift the x-view according to NUMBER which is measured in "units"
		 *         or "pages" (WHAT).
		 */
		xview_scroll(number, what): Promise<any>
		xview_scroll$({ number, what }): Promise<any>
	}

	/**
	 * Mix-in class for querying and changing the vertical position
	 *     of a widget's window.
	 */
	interface IYView {

		/**
		 * Query and change the vertical position of the view.
		 */
		yview(): Promise<any>
		yview$($: {}): Promise<any>

		/**
		 * Adjusts the view in the window so that FRACTION of the
		 *         total height of the canvas is off-screen to the top.
		 */
		yview_moveto(fraction): Promise<any>
		yview_moveto$({ fraction }): Promise<any>

		/**
		 * Shift the y-view according to NUMBER which is measured in
		 *         "units" or "pages" (WHAT).
		 */
		yview_scroll(number, what): Promise<any>
		yview_scroll$({ number, what }): Promise<any>
	}

	/**
	 * Provides functions for the communication with the window manager.
	 */
	interface IWm {

		/**
		 * Instruct the window manager to set the aspect ratio (width/height)
		 *         of this widget to be between MINNUMER/MINDENOM and MAXNUMER/MAXDENOM. Return a tuple
		 *         of the actual values if no argument is given.
		 */
		wm_aspect(minNumer?, minDenom?, maxNumer?, maxDenom?): Promise<any>
		wm_aspect$({ minNumer, minDenom, maxNumer, maxDenom }: { minNumer?, minDenom?, maxNumer?, maxDenom?}): Promise<any>

		/**
		 * This subcommand returns or sets platform specific attributes
		 * 
		 *         The first form returns a list of the platform specific flags and
		 *         their values. The second form returns the value for the specific
		 *         option. The third form sets one or more of the values. The values
		 *         are as follows:
		 * 
		 *         On Windows, -disabled gets or sets whether the window is in a
		 *         disabled state. -toolwindow gets or sets the style of the window
		 *         to toolwindow (as defined in the MSDN). -topmost gets or sets
		 *         whether this is a topmost window (displays above all other
		 *         windows).
		 * 
		 *         On Macintosh, XXXXX
		 * 
		 *         On Unix, there are currently no special attribute values.
		 *         
		 */
		wm_attributes(): Promise<any>
		wm_attributes$($: {}): Promise<any>

		/**
		 * Store NAME in WM_CLIENT_MACHINE property of this widget. Return
		 *         current value.
		 */
		wm_client(name?): Promise<any>
		wm_client$({ name }: { name?}): Promise<any>

		/**
		 * Store list of window names (WLIST) into WM_COLORMAPWINDOWS property
		 *         of this widget. This list contains windows whose colormaps differ from their
		 *         parents. Return current list of widgets if WLIST is empty.
		 */
		wm_colormapwindows(): Promise<any>
		wm_colormapwindows$($: {}): Promise<any>

		/**
		 * Store VALUE in WM_COMMAND property. It is the command
		 *         which shall be used to invoke the application. Return current
		 *         command if VALUE is None.
		 */
		wm_command(value?): Promise<any>
		wm_command$({ value }: { value?}): Promise<any>

		/**
		 * Deiconify this widget. If it was never mapped it will not be mapped.
		 *         On Windows it will raise this widget and give it the focus.
		 */
		wm_deiconify(): Promise<any>
		wm_deiconify$($: {}): Promise<any>

		/**
		 * Set focus model to MODEL. "active" means that this widget will claim
		 *         the focus itself, "passive" means that the window manager shall give
		 *         the focus. Return current focus model if MODEL is None.
		 */
		wm_focusmodel(model?): Promise<any>
		wm_focusmodel$({ model }: { model?}): Promise<any>

		/**
		 * The window will be unmapped from the screen and will no longer
		 *         be managed by wm. toplevel windows will be treated like frame
		 *         windows once they are no longer managed by wm, however, the menu
		 *         option configuration will be remembered and the menus will return
		 *         once the widget is managed again.
		 */
		wm_forget(window): Promise<any>
		wm_forget$({ window }): Promise<any>

		/**
		 * Return identifier for decorative frame of this widget if present.
		 */
		wm_frame(): Promise<any>
		wm_frame$($: {}): Promise<any>

		/**
		 * Set geometry to NEWGEOMETRY of the form =widthxheight+x+y. Return
		 *         current value if None is given.
		 */
		wm_geometry(newGeometry?): Promise<any>
		wm_geometry$({ newGeometry }: { newGeometry?}): Promise<any>

		/**
		 * Instruct the window manager that this widget shall only be
		 *         resized on grid boundaries. WIDTHINC and HEIGHTINC are the width and
		 *         height of a grid unit in pixels. BASEWIDTH and BASEHEIGHT are the
		 *         number of grid units requested in Tk_GeometryRequest.
		 */
		wm_grid(baseWidth?, baseHeight?, widthInc?, heightInc?): Promise<any>
		wm_grid$({ baseWidth, baseHeight, widthInc, heightInc }: { baseWidth?, baseHeight?, widthInc?, heightInc?}): Promise<any>

		/**
		 * Set the group leader widgets for related widgets to PATHNAME. Return
		 *         the group leader of this widget if None is given.
		 */
		wm_group(pathName?): Promise<any>
		wm_group$({ pathName }: { pathName?}): Promise<any>

		/**
		 * Set bitmap for the iconified widget to BITMAP. Return
		 *         the bitmap if None is given.
		 * 
		 *         Under Windows, the DEFAULT parameter can be used to set the icon
		 *         for the widget and any descendents that don't have an icon set
		 *         explicitly.  DEFAULT can be the relative path to a .ico file
		 *         (example: root.iconbitmap(default='myicon.ico') ).  See Tk
		 *         documentation for more information.
		 */
		wm_iconbitmap(bitmap?, def?): Promise<any>
		wm_iconbitmap$({ bitmap, def }: { bitmap?, def?}): Promise<any>

		/**
		 * Display widget as icon.
		 */
		wm_iconify(): Promise<any>
		wm_iconify$($: {}): Promise<any>

		/**
		 * Set mask for the icon bitmap of this widget. Return the
		 *         mask if None is given.
		 */
		wm_iconmask(bitmap?): Promise<any>
		wm_iconmask$({ bitmap }: { bitmap?}): Promise<any>

		/**
		 * Set the name of the icon for this widget. Return the name if
		 *         None is given.
		 */
		wm_iconname(newName?): Promise<any>
		wm_iconname$({ newName }: { newName?}): Promise<any>

		/**
		 * Sets the titlebar icon for this window based on the named photo
		 *         images passed through args. If default is True, this is applied to
		 *         all future created toplevels as well.
		 * 
		 *         The data in the images is taken as a snapshot at the time of
		 *         invocation. If the images are later changed, this is not reflected
		 *         to the titlebar icons. Multiple images are accepted to allow
		 *         different images sizes to be provided. The window manager may scale
		 *         provided icons to an appropriate size.
		 * 
		 *         On Windows, the images are packed into a Windows icon structure.
		 *         This will override an icon specified to wm_iconbitmap, and vice
		 *         versa.
		 * 
		 *         On X, the images are arranged into the _NET_WM_ICON X property,
		 *         which most modern window managers support. An icon specified by
		 *         wm_iconbitmap may exist simultaneously.
		 * 
		 *         On Macintosh, this currently does nothing.
		 */
		wm_iconphoto(def?: boolean): Promise<any>
		wm_iconphoto$({ def }: { def?}): Promise<any>

		/**
		 * Set the position of the icon of this widget to X and Y. Return
		 *         a tuple of the current values of X and X if None is given.
		 */
		wm_iconposition(x?, y?): Promise<any>
		wm_iconposition$({ x, y }: { x?, y?}): Promise<any>

		/**
		 * Set widget PATHNAME to be displayed instead of icon. Return the current
		 *         value if None is given.
		 */
		wm_iconwindow(pathName?): Promise<any>
		wm_iconwindow$({ pathName }: { pathName?}): Promise<any>

		/**
		 * The widget specified will become a stand alone top-level window.
		 *         The window will be decorated with the window managers title bar,
		 *         etc.
		 */
		wm_manage(widget): Promise<any>
		wm_manage$({ widget }): Promise<any>

		/**
		 * Set max WIDTH and HEIGHT for this widget. If the window is gridded
		 *         the values are given in grid units. Return the current values if None
		 *         is given.
		 */
		wm_maxsize(width?, height?): Promise<any>
		wm_maxsize$({ width, height }: { width?, height?}): Promise<any>

		/**
		 * Set min WIDTH and HEIGHT for this widget. If the window is gridded
		 *         the values are given in grid units. Return the current values if None
		 *         is given.
		 */
		wm_minsize(width?, height?): Promise<any>
		wm_minsize$({ width, height }: { width?, height?}): Promise<any>

		/**
		 * Instruct the window manager to ignore this widget
		 *         if BOOLEAN is given with 1. Return the current value if None
		 *         is given.
		 */
		wm_overrideredirect(boolean?): Promise<any>
		wm_overrideredirect$({ boolean }: { boolean?}): Promise<any>

		/**
		 * Instruct the window manager that the position of this widget shall
		 *         be defined by the user if WHO is "user", and by its own policy if WHO is
		 *         "program".
		 */
		wm_positionfrom(who?): Promise<any>
		wm_positionfrom$({ who }: { who?}): Promise<any>

		/**
		 * Bind function FUNC to command NAME for this widget.
		 *         Return the function bound to NAME if None is given. NAME could be
		 *         e.g. "WM_SAVE_YOURSELF" or "WM_DELETE_WINDOW".
		 */
		wm_protocol(name?, func?): Promise<any>
		wm_protocol$({ name, func }: { name?, func?}): Promise<any>

		/**
		 * Instruct the window manager whether this width can be resized
		 *         in WIDTH or HEIGHT. Both values are boolean values.
		 */
		wm_resizable(width?, height?): Promise<any>
		wm_resizable$({ width, height }: { width?, height?}): Promise<any>

		/**
		 * Instruct the window manager that the size of this widget shall
		 *         be defined by the user if WHO is "user", and by its own policy if WHO is
		 *         "program".
		 */
		wm_sizefrom(who?): Promise<any>
		wm_sizefrom$({ who }: { who?}): Promise<any>

		/**
		 * Query or set the state of this widget as one of normal, icon,
		 *         iconic (see wm_iconwindow), withdrawn, or zoomed (Windows only).
		 */
		wm_state(newstate?): Promise<any>
		wm_state$({ newstate }: { newstate?}): Promise<any>

		/**
		 * Set the title of this widget.
		 */
		wm_title(string?): Promise<any>
		wm_title$({ string }: { string?}): Promise<any>

		/**
		 * Instruct the window manager that this widget is transient
		 *         with regard to widget MASTER.
		 */
		wm_transient(master?): Promise<any>
		wm_transient$({ master }: { master?}): Promise<any>

		/**
		 * Withdraw this widget from the screen such that it is unmapped
		 *         and forgotten by the window manager. Re-draw it with wm_deiconify.
		 */
		wm_withdraw(): Promise<any>
		wm_withdraw$($: {}): Promise<any>
		aspect
		attributes
		client
		colormapwindows
		command
		deiconify
		focusmodel
		forget
		frame
		geometry
		grid
		group
		iconbitmap
		iconify
		iconmask
		iconname
		iconphoto
		iconposition
		iconwindow
		manage
		maxsize
		minsize
		overrideredirect
		positionfrom
		protocol
		resizable
		sizefrom
		state
		title
		transient
		withdraw
	}

	/**
	 * Toplevel widget of Tk which represents mostly the main window
	 *     of an application. It has an associated Tcl interpreter.
	 */

	/**
	 * Return a new Toplevel widget on screen SCREENNAME. A new Tcl interpreter will
	 *         be created. BASENAME will be used for the identification of the profile file (see
	 *         readprofile).
	 *         It is constructed from sys.argv[0] without extensions if None is given. CLASSNAME
	 *         is the name of the widget class.
	 */
	function Tk(screenName?, baseName?, className?, useTk?: boolean, sync?: boolean, use?): Promise<ITk>
	function Tk$({ screenName, baseName, className, useTk, sync, use }: { screenName?, baseName?, className?, useTk?, sync?, use?}): Promise<ITk>
	interface ITk extends IMisc, IWm {
		loadtk(): Promise<any>
		loadtk$($: {}): Promise<any>

		/**
		 * Destroy this and all descendants widgets. This will
		 *         end the application of this Tcl interpreter.
		 */
		destroy(): Promise<any>
		destroy$($: {}): Promise<any>

		/**
		 * Internal function. It reads BASENAME.tcl and CLASSNAME.tcl into
		 *         the Tcl Interpreter and calls exec on the contents of BASENAME.py and
		 *         CLASSNAME.py if such a file exists in the home directory.
		 */
		readprofile(baseName, className): Promise<any>
		readprofile$({ baseName, className }): Promise<any>

		/**
		 * Report callback exception on sys.stderr.
		 * 
		 *         Applications may want to override this internal function, and
		 *         should when sys.stderr is None.
		 */
		report_callback_exception(exc, val, tb): Promise<any>
		report_callback_exception$({ exc, val, tb }): Promise<any>
	}

	/**
	 * Geometry manager Pack.
	 * 
	 *     Base class to use the methods pack_* in every widget.
	 */
	interface IPack {

		/**
		 * Pack a widget in the parent widget. Use as options:
		 *         after=widget - pack it after you have packed widget
		 *         anchor=NSEW (or subset) - position widget according to
		 *                                   given direction
		 *         before=widget - pack it before you will pack widget
		 *         expand=bool - expand widget if parent size grows
		 *         fill=NONE or X or Y or BOTH - fill widget if widget grows
		 *         in=master - use master to contain this widget
		 *         in_=master - see 'in' option description
		 *         ipadx=amount - add internal padding in x direction
		 *         ipady=amount - add internal padding in y direction
		 *         padx=amount - add padding in x direction
		 *         pady=amount - add padding in y direction
		 *         side=TOP or BOTTOM or LEFT or RIGHT -  where to add this widget.
		 *         
		 */
		pack_configure(cnf?): Promise<any>
		pack_configure$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Unmap this widget and do not use it for the packing order.
		 */
		pack_forget(): Promise<any>
		pack_forget$($: {}): Promise<any>

		/**
		 * Return information about the packing options
		 *         for this widget.
		 */
		pack_info(): Promise<any>
		pack_info$($: {}): Promise<any>
		pack
		info
	}

	/**
	 * Geometry manager Place.
	 * 
	 *     Base class to use the methods place_* in every widget.
	 */
	interface IPlace {

		/**
		 * Place a widget in the parent widget. Use as options:
		 *         in=master - master relative to which the widget is placed
		 *         in_=master - see 'in' option description
		 *         x=amount - locate anchor of this widget at position x of master
		 *         y=amount - locate anchor of this widget at position y of master
		 *         relx=amount - locate anchor of this widget between 0.0 and 1.0
		 *                       relative to width of master (1.0 is right edge)
		 *         rely=amount - locate anchor of this widget between 0.0 and 1.0
		 *                       relative to height of master (1.0 is bottom edge)
		 *         anchor=NSEW (or subset) - position anchor according to given direction
		 *         width=amount - width of this widget in pixel
		 *         height=amount - height of this widget in pixel
		 *         relwidth=amount - width of this widget between 0.0 and 1.0
		 *                           relative to width of master (1.0 is the same width
		 *                           as the master)
		 *         relheight=amount - height of this widget between 0.0 and 1.0
		 *                            relative to height of master (1.0 is the same
		 *                            height as the master)
		 *         bordermode="inside" or "outside" - whether to take border width of
		 *                                            master widget into account
		 *         
		 */
		place_configure(cnf?): Promise<any>
		place_configure$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Unmap this widget.
		 */
		place_forget(): Promise<any>
		place_forget$($: {}): Promise<any>

		/**
		 * Return information about the placing options
		 *         for this widget.
		 */
		place_info(): Promise<any>
		place_info$($: {}): Promise<any>
		place
	}

	/**
	 * Geometry manager Grid.
	 * 
	 *     Base class to use the methods grid_* in every widget.
	 */
	interface IGrid {

		/**
		 * Position a widget in the parent widget in a grid. Use as options:
		 *         column=number - use cell identified with given column (starting with 0)
		 *         columnspan=number - this widget will span several columns
		 *         in=master - use master to contain this widget
		 *         in_=master - see 'in' option description
		 *         ipadx=amount - add internal padding in x direction
		 *         ipady=amount - add internal padding in y direction
		 *         padx=amount - add padding in x direction
		 *         pady=amount - add padding in y direction
		 *         row=number - use cell identified with given row (starting with 0)
		 *         rowspan=number - this widget will span several rows
		 *         sticky=NSEW - if cell is larger on which sides will this
		 *                       widget stick to the cell boundary
		 *         
		 */
		grid_configure(cnf?): Promise<any>
		grid_configure$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Unmap this widget.
		 */
		grid_forget(): Promise<any>
		grid_forget$($: {}): Promise<any>

		/**
		 * Unmap this widget but remember the grid options.
		 */
		grid_remove(): Promise<any>
		grid_remove$($: {}): Promise<any>

		/**
		 * Return information about the options
		 *         for positioning this widget in a grid.
		 */
		grid_info(): Promise<any>
		grid_info$($: {}): Promise<any>
		location
	}

	/**
	 * Internal class.
	 */

	/**
	 * Construct a widget with the parent widget MASTER, a name WIDGETNAME
	 *         and appropriate options.
	 */
	function BaseWidget(master, widgetName, cnf?, kw?, extra?): Promise<IBaseWidget>
	function BaseWidget$({ master, widgetName, cnf, kw, extra }: { master, widgetName, cnf?, kw?, extra?}): Promise<IBaseWidget>
	interface IBaseWidget extends IMisc {

		/**
		 * Destroy this and all descendants widgets.
		 */
		destroy(): Promise<any>
		destroy$($: {}): Promise<any>
	}

	/**
	 * Internal class.
	 * 
	 *     Base class for a widget which can be positioned with the geometry managers
	 *     Pack, Place or Grid.
	 */
	interface IWidget extends IBaseWidget, IPack, IPlace, IGrid {
	}

	/**
	 * Toplevel widget, e.g. for dialogs.
	 */

	/**
	 * Construct a toplevel widget with the parent MASTER.
	 * 
	 *         Valid resource names: background, bd, bg, borderwidth, class,
	 *         colormap, container, cursor, height, highlightbackground,
	 *         highlightcolor, highlightthickness, menu, relief, screen, takefocus,
	 *         use, visual, width.
	 */
	function Toplevel(master?, cnf?): Promise<IToplevel>
	function Toplevel$({ master, cnf }: { master?, cnf?}): Promise<IToplevel>
	interface IToplevel extends IBaseWidget, IWm {
	}

	/**
	 * Button widget.
	 */

	/**
	 * Construct a button widget with the parent MASTER.
	 * 
	 *         STANDARD OPTIONS
	 * 
	 *             activebackground, activeforeground, anchor,
	 *             background, bitmap, borderwidth, cursor,
	 *             disabledforeground, font, foreground
	 *             highlightbackground, highlightcolor,
	 *             highlightthickness, image, justify,
	 *             padx, pady, relief, repeatdelay,
	 *             repeatinterval, takefocus, text,
	 *             textvariable, underline, wraplength
	 * 
	 *         WIDGET-SPECIFIC OPTIONS
	 * 
	 *             command, compound, default, height,
	 *             overrelief, state, width
	 *         
	 */
	function Button(master?, cnf?): Promise<IButton>
	function Button$({ master, cnf }: { master?, cnf?}): Promise<IButton>
	interface IButton extends IWidget {

		/**
		 * Flash the button.
		 * 
		 *         This is accomplished by redisplaying
		 *         the button several times, alternating between active and
		 *         normal colors. At the end of the flash the button is left
		 *         in the same normal/active state as when the command was
		 *         invoked. This command is ignored if the button's state is
		 *         disabled.
		 *         
		 */
		flash(): Promise<any>
		flash$($: {}): Promise<any>

		/**
		 * Invoke the command associated with the button.
		 * 
		 *         The return value is the return value from the command,
		 *         or an empty string if there is no command associated with
		 *         the button. This command is ignored if the button's state
		 *         is disabled.
		 *         
		 */
		invoke(): Promise<any>
		invoke$($: {}): Promise<any>
	}

	/**
	 * Canvas widget to display graphical elements like lines or text.
	 */

	/**
	 * Construct a canvas widget with the parent MASTER.
	 * 
	 *         Valid resource names: background, bd, bg, borderwidth, closeenough,
	 *         confine, cursor, height, highlightbackground, highlightcolor,
	 *         highlightthickness, insertbackground, insertborderwidth,
	 *         insertofftime, insertontime, insertwidth, offset, relief,
	 *         scrollregion, selectbackground, selectborderwidth, selectforeground,
	 *         state, takefocus, width, xscrollcommand, xscrollincrement,
	 *         yscrollcommand, yscrollincrement.
	 */
	function Canvas(master?, cnf?): Promise<ICanvas>
	function Canvas$({ master, cnf }: { master?, cnf?}): Promise<ICanvas>
	interface ICanvas extends IWidget, IXView, IYView {

		/**
		 * Internal function.
		 */
		addtag(): Promise<any>
		addtag$($: {}): Promise<any>

		/**
		 * Add tag NEWTAG to all items above TAGORID.
		 */
		addtag_above(newtag, tagOrId): Promise<any>
		addtag_above$({ newtag, tagOrId }): Promise<any>

		/**
		 * Add tag NEWTAG to all items.
		 */
		addtag_all(newtag): Promise<any>
		addtag_all$({ newtag }): Promise<any>

		/**
		 * Add tag NEWTAG to all items below TAGORID.
		 */
		addtag_below(newtag, tagOrId): Promise<any>
		addtag_below$({ newtag, tagOrId }): Promise<any>

		/**
		 * Add tag NEWTAG to item which is closest to pixel at X, Y.
		 *         If several match take the top-most.
		 *         All items closer than HALO are considered overlapping (all are
		 *         closests). If START is specified the next below this tag is taken.
		 */
		addtag_closest(newtag, x, y, halo?, start?): Promise<any>
		addtag_closest$({ newtag, x, y, halo, start }: { newtag, x, y, halo?, start?}): Promise<any>

		/**
		 * Add tag NEWTAG to all items in the rectangle defined
		 *         by X1,Y1,X2,Y2.
		 */
		addtag_enclosed(newtag, x1, y1, x2, y2): Promise<any>
		addtag_enclosed$({ newtag, x1, y1, x2, y2 }): Promise<any>

		/**
		 * Add tag NEWTAG to all items which overlap the rectangle
		 *         defined by X1,Y1,X2,Y2.
		 */
		addtag_overlapping(newtag, x1, y1, x2, y2): Promise<any>
		addtag_overlapping$({ newtag, x1, y1, x2, y2 }): Promise<any>

		/**
		 * Add tag NEWTAG to all items with TAGORID.
		 */
		addtag_withtag(newtag, tagOrId): Promise<any>
		addtag_withtag$({ newtag, tagOrId }): Promise<any>

		/**
		 * Return a tuple of X1,Y1,X2,Y2 coordinates for a rectangle
		 *         which encloses all items with tags specified as arguments.
		 */
		bbox(): Promise<any>
		bbox$($: {}): Promise<any>

		/**
		 * Unbind for all items with TAGORID for event SEQUENCE  the
		 *         function identified with FUNCID.
		 */
		tag_unbind(tagOrId, sequence, funcid?): Promise<any>
		tag_unbind$({ tagOrId, sequence, funcid }: { tagOrId, sequence, funcid?}): Promise<any>

		/**
		 * Bind to all items with TAGORID at event SEQUENCE a call to function FUNC.
		 * 
		 *         An additional boolean parameter ADD specifies whether FUNC will be
		 *         called additionally to the other bound function or whether it will
		 *         replace the previous function. See bind for the return value.
		 */
		tag_bind(tagOrId, sequence?, func?, add?): Promise<any>
		tag_bind$({ tagOrId, sequence, func, add }: { tagOrId, sequence?, func?, add?}): Promise<any>

		/**
		 * Return the canvas x coordinate of pixel position SCREENX rounded
		 *         to nearest multiple of GRIDSPACING units.
		 */
		canvasx(screenx, gridspacing?): Promise<any>
		canvasx$({ screenx, gridspacing }: { screenx, gridspacing?}): Promise<any>

		/**
		 * Return the canvas y coordinate of pixel position SCREENY rounded
		 *         to nearest multiple of GRIDSPACING units.
		 */
		canvasy(screeny, gridspacing?): Promise<any>
		canvasy$({ screeny, gridspacing }: { screeny, gridspacing?}): Promise<any>

		/**
		 * Return a list of coordinates for the item given in ARGS.
		 */
		coords(): Promise<any>
		coords$($: {}): Promise<any>

		/**
		 * Create arc shaped region with coordinates x1,y1,x2,y2.
		 */
		create_arc(): Promise<any>
		create_arc$($: {}): Promise<any>

		/**
		 * Create bitmap with coordinates x1,y1.
		 */
		create_bitmap(): Promise<any>
		create_bitmap$($: {}): Promise<any>

		/**
		 * Create image item with coordinates x1,y1.
		 */
		create_image(): Promise<any>
		create_image$($: {}): Promise<any>

		/**
		 * Create line with coordinates x1,y1,...,xn,yn.
		 */
		create_line(): Promise<any>
		create_line$($: {}): Promise<any>

		/**
		 * Create oval with coordinates x1,y1,x2,y2.
		 */
		create_oval(): Promise<any>
		create_oval$($: {}): Promise<any>

		/**
		 * Create polygon with coordinates x1,y1,...,xn,yn.
		 */
		create_polygon(): Promise<any>
		create_polygon$($: {}): Promise<any>

		/**
		 * Create rectangle with coordinates x1,y1,x2,y2.
		 */
		create_rectangle(): Promise<any>
		create_rectangle$($: {}): Promise<any>

		/**
		 * Create text with coordinates x1,y1.
		 */
		create_text(): Promise<any>
		create_text$($: {}): Promise<any>

		/**
		 * Create window with coordinates x1,y1,x2,y2.
		 */
		create_window(): Promise<any>
		create_window$($: {}): Promise<any>

		/**
		 * Delete characters of text items identified by tag or id in ARGS (possibly
		 *         several times) from FIRST to LAST character (including).
		 */
		dchars(): Promise<any>
		dchars$($: {}): Promise<any>

		/**
		 * Delete items identified by all tag or ids contained in ARGS.
		 */
		delete(): Promise<any>
		delete$($: {}): Promise<any>

		/**
		 * Delete tag or id given as last arguments in ARGS from items
		 *         identified by first argument in ARGS.
		 */
		dtag(): Promise<any>
		dtag$($: {}): Promise<any>

		/**
		 * Internal function.
		 */
		find(): Promise<any>
		find$($: {}): Promise<any>

		/**
		 * Return items above TAGORID.
		 */
		find_above(tagOrId): Promise<any>
		find_above$({ tagOrId }): Promise<any>

		/**
		 * Return all items.
		 */
		find_all(): Promise<any>
		find_all$($: {}): Promise<any>

		/**
		 * Return all items below TAGORID.
		 */
		find_below(tagOrId): Promise<any>
		find_below$({ tagOrId }): Promise<any>

		/**
		 * Return item which is closest to pixel at X, Y.
		 *         If several match take the top-most.
		 *         All items closer than HALO are considered overlapping (all are
		 *         closest). If START is specified the next below this tag is taken.
		 */
		find_closest(x, y, halo?, start?): Promise<any>
		find_closest$({ x, y, halo, start }: { x, y, halo?, start?}): Promise<any>

		/**
		 * Return all items in rectangle defined
		 *         by X1,Y1,X2,Y2.
		 */
		find_enclosed(x1, y1, x2, y2): Promise<any>
		find_enclosed$({ x1, y1, x2, y2 }): Promise<any>

		/**
		 * Return all items which overlap the rectangle
		 *         defined by X1,Y1,X2,Y2.
		 */
		find_overlapping(x1, y1, x2, y2): Promise<any>
		find_overlapping$({ x1, y1, x2, y2 }): Promise<any>

		/**
		 * Return all items with TAGORID.
		 */
		find_withtag(tagOrId): Promise<any>
		find_withtag$({ tagOrId }): Promise<any>

		/**
		 * Set focus to the first item specified in ARGS.
		 */
		focus(): Promise<any>
		focus$($: {}): Promise<any>

		/**
		 * Return tags associated with the first item specified in ARGS.
		 */
		gettags(): Promise<any>
		gettags$($: {}): Promise<any>

		/**
		 * Set cursor at position POS in the item identified by TAGORID.
		 *         In ARGS TAGORID must be first.
		 */
		icursor(): Promise<any>
		icursor$($: {}): Promise<any>

		/**
		 * Return position of cursor as integer in item specified in ARGS.
		 */
		index(): Promise<any>
		index$($: {}): Promise<any>

		/**
		 * Insert TEXT in item TAGORID at position POS. ARGS must
		 *         be TAGORID POS TEXT.
		 */
		insert(): Promise<any>
		insert$($: {}): Promise<any>

		/**
		 * Return the resource value for an OPTION for item TAGORID.
		 */
		itemcget(tagOrId, option): Promise<any>
		itemcget$({ tagOrId, option }): Promise<any>

		/**
		 * Configure resources of an item TAGORID.
		 * 
		 *         The values for resources are specified as keyword
		 *         arguments. To get an overview about
		 *         the allowed keyword arguments call the method without arguments.
		 *         
		 */
		itemconfigure(tagOrId, cnf?): Promise<any>
		itemconfigure$({ tagOrId, cnf }: { tagOrId, cnf?}): Promise<any>

		/**
		 * Lower an item TAGORID given in ARGS
		 *         (optional below another item).
		 */
		tag_lower(): Promise<any>
		tag_lower$($: {}): Promise<any>

		/**
		 * Move an item TAGORID given in ARGS.
		 */
		move(): Promise<any>
		move$($: {}): Promise<any>

		/**
		 * Move the items given by TAGORID in the canvas coordinate
		 *         space so that the first coordinate pair of the bottommost
		 *         item with tag TAGORID is located at position (X,Y).
		 *         X and Y may be the empty string, in which case the
		 *         corresponding coordinate will be unchanged. All items matching
		 *         TAGORID remain in the same positions relative to each other.
		 */
		moveto(tagOrId, x?, y?): Promise<any>
		moveto$({ tagOrId, x, y }: { tagOrId, x?, y?}): Promise<any>

		/**
		 * Print the contents of the canvas to a postscript
		 *         file. Valid options: colormap, colormode, file, fontmap,
		 *         height, pageanchor, pageheight, pagewidth, pagex, pagey,
		 *         rotate, width, x, y.
		 */
		postscript(cnf?): Promise<any>
		postscript$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Raise an item TAGORID given in ARGS
		 *         (optional above another item).
		 */
		tag_raise(): Promise<any>
		tag_raise$($: {}): Promise<any>

		/**
		 * Scale item TAGORID with XORIGIN, YORIGIN, XSCALE, YSCALE.
		 */
		scale(): Promise<any>
		scale$($: {}): Promise<any>

		/**
		 * Remember the current X, Y coordinates.
		 */
		scan_mark(x, y): Promise<any>
		scan_mark$({ x, y }): Promise<any>

		/**
		 * Adjust the view of the canvas to GAIN times the
		 *         difference between X and Y and the coordinates given in
		 *         scan_mark.
		 */
		scan_dragto(x, y, gain?): Promise<any>
		scan_dragto$({ x, y, gain }: { x, y, gain?}): Promise<any>

		/**
		 * Adjust the end of the selection near the cursor of an item TAGORID to index.
		 */
		select_adjust(tagOrId, index): Promise<any>
		select_adjust$({ tagOrId, index }): Promise<any>

		/**
		 * Clear the selection if it is in this widget.
		 */
		select_clear(): Promise<any>
		select_clear$($: {}): Promise<any>

		/**
		 * Set the fixed end of a selection in item TAGORID to INDEX.
		 */
		select_from(tagOrId, index): Promise<any>
		select_from$({ tagOrId, index }): Promise<any>

		/**
		 * Return the item which has the selection.
		 */
		select_item(): Promise<any>
		select_item$($: {}): Promise<any>

		/**
		 * Set the variable end of a selection in item TAGORID to INDEX.
		 */
		select_to(tagOrId, index): Promise<any>
		select_to$({ tagOrId, index }): Promise<any>

		/**
		 * Return the type of the item TAGORID.
		 */
		type(tagOrId): Promise<any>
		type$({ tagOrId }): Promise<any>
		itemconfig
	}

	/**
	 * Checkbutton widget which is either in on- or off-state.
	 */

	/**
	 * Construct a checkbutton widget with the parent MASTER.
	 * 
	 *         Valid resource names: activebackground, activeforeground, anchor,
	 *         background, bd, bg, bitmap, borderwidth, command, cursor,
	 *         disabledforeground, fg, font, foreground, height,
	 *         highlightbackground, highlightcolor, highlightthickness, image,
	 *         indicatoron, justify, offvalue, onvalue, padx, pady, relief,
	 *         selectcolor, selectimage, state, takefocus, text, textvariable,
	 *         underline, variable, width, wraplength.
	 */
	function Checkbutton(master?, cnf?): Promise<ICheckbutton>
	function Checkbutton$({ master, cnf }: { master?, cnf?}): Promise<ICheckbutton>
	interface ICheckbutton extends IWidget {

		/**
		 * Put the button in off-state.
		 */
		deselect(): Promise<any>
		deselect$($: {}): Promise<any>

		/**
		 * Flash the button.
		 */
		flash(): Promise<any>
		flash$($: {}): Promise<any>

		/**
		 * Toggle the button and invoke a command if given as resource.
		 */
		invoke(): Promise<any>
		invoke$($: {}): Promise<any>

		/**
		 * Put the button in on-state.
		 */
		select(): Promise<any>
		select$($: {}): Promise<any>

		/**
		 * Toggle the button.
		 */
		toggle(): Promise<any>
		toggle$($: {}): Promise<any>
	}

	/**
	 * Entry widget which allows displaying simple text.
	 */

	/**
	 * Construct an entry widget with the parent MASTER.
	 * 
	 *         Valid resource names: background, bd, bg, borderwidth, cursor,
	 *         exportselection, fg, font, foreground, highlightbackground,
	 *         highlightcolor, highlightthickness, insertbackground,
	 *         insertborderwidth, insertofftime, insertontime, insertwidth,
	 *         invalidcommand, invcmd, justify, relief, selectbackground,
	 *         selectborderwidth, selectforeground, show, state, takefocus,
	 *         textvariable, validate, validatecommand, vcmd, width,
	 *         xscrollcommand.
	 */
	function Entry(master?, cnf?): Promise<IEntry>
	function Entry$({ master, cnf }: { master?, cnf?}): Promise<IEntry>
	interface IEntry extends IWidget, IXView {

		/**
		 * Delete text from FIRST to LAST (not included).
		 */
		delete(first, last?): Promise<any>
		delete$({ first, last }: { first, last?}): Promise<any>

		/**
		 * Return the text.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>

		/**
		 * Insert cursor at INDEX.
		 */
		icursor(index): Promise<any>
		icursor$({ index }): Promise<any>

		/**
		 * Return position of cursor.
		 */
		index(index): Promise<any>
		index$({ index }): Promise<any>

		/**
		 * Insert STRING at INDEX.
		 */
		insert(index, string): Promise<any>
		insert$({ index, string }): Promise<any>

		/**
		 * Remember the current X, Y coordinates.
		 */
		scan_mark(x): Promise<any>
		scan_mark$({ x }): Promise<any>

		/**
		 * Adjust the view of the canvas to 10 times the
		 *         difference between X and Y and the coordinates given in
		 *         scan_mark.
		 */
		scan_dragto(x): Promise<any>
		scan_dragto$({ x }): Promise<any>

		/**
		 * Adjust the end of the selection near the cursor to INDEX.
		 */
		selection_adjust(index): Promise<any>
		selection_adjust$({ index }): Promise<any>

		/**
		 * Clear the selection if it is in this widget.
		 */
		selection_clear(): Promise<any>
		selection_clear$($: {}): Promise<any>

		/**
		 * Set the fixed end of a selection to INDEX.
		 */
		selection_from(index): Promise<any>
		selection_from$({ index }): Promise<any>

		/**
		 * Return True if there are characters selected in the entry, False
		 *         otherwise.
		 */
		selection_present(): Promise<any>
		selection_present$($: {}): Promise<any>

		/**
		 * Set the selection from START to END (not included).
		 */
		selection_range(start, end): Promise<any>
		selection_range$({ start, end }): Promise<any>

		/**
		 * Set the variable end of a selection to INDEX.
		 */
		selection_to(index): Promise<any>
		selection_to$({ index }): Promise<any>
		select_present
		select_range
	}

	/**
	 * Frame widget which may contain other widgets and can have a 3D border.
	 */

	/**
	 * Construct a frame widget with the parent MASTER.
	 * 
	 *         Valid resource names: background, bd, bg, borderwidth, class,
	 *         colormap, container, cursor, height, highlightbackground,
	 *         highlightcolor, highlightthickness, relief, takefocus, visual, width.
	 */
	function Frame(master?, cnf?): Promise<IFrame>
	function Frame$({ master, cnf }: { master?, cnf?}): Promise<IFrame>
	interface IFrame extends IWidget {
	}

	/**
	 * Label widget which can display text and bitmaps.
	 */

	/**
	 * Construct a label widget with the parent MASTER.
	 * 
	 *         STANDARD OPTIONS
	 * 
	 *             activebackground, activeforeground, anchor,
	 *             background, bitmap, borderwidth, cursor,
	 *             disabledforeground, font, foreground,
	 *             highlightbackground, highlightcolor,
	 *             highlightthickness, image, justify,
	 *             padx, pady, relief, takefocus, text,
	 *             textvariable, underline, wraplength
	 * 
	 *         WIDGET-SPECIFIC OPTIONS
	 * 
	 *             height, state, width
	 * 
	 *         
	 */
	function Label(master?, cnf?): Promise<ILabel>
	function Label$({ master, cnf }: { master?, cnf?}): Promise<ILabel>
	interface ILabel extends IWidget {
	}

	/**
	 * Listbox widget which can display a list of strings.
	 */

	/**
	 * Construct a listbox widget with the parent MASTER.
	 * 
	 *         Valid resource names: background, bd, bg, borderwidth, cursor,
	 *         exportselection, fg, font, foreground, height, highlightbackground,
	 *         highlightcolor, highlightthickness, relief, selectbackground,
	 *         selectborderwidth, selectforeground, selectmode, setgrid, takefocus,
	 *         width, xscrollcommand, yscrollcommand, listvariable.
	 */
	function Listbox(master?, cnf?): Promise<IListbox>
	function Listbox$({ master, cnf }: { master?, cnf?}): Promise<IListbox>
	interface IListbox extends IWidget, IXView, IYView {

		/**
		 * Activate item identified by INDEX.
		 */
		activate(index): Promise<any>
		activate$({ index }): Promise<any>

		/**
		 * Return a tuple of X1,Y1,X2,Y2 coordinates for a rectangle
		 *         which encloses the item identified by the given index.
		 */
		bbox(index): Promise<any>
		bbox$({ index }): Promise<any>

		/**
		 * Return the indices of currently selected item.
		 */
		curselection(): Promise<any>
		curselection$($: {}): Promise<any>

		/**
		 * Delete items from FIRST to LAST (included).
		 */
		delete(first, last?): Promise<any>
		delete$({ first, last }: { first, last?}): Promise<any>

		/**
		 * Get list of items from FIRST to LAST (included).
		 */
		get(first, last?): Promise<any>
		get$({ first, last }: { first, last?}): Promise<any>

		/**
		 * Return index of item identified with INDEX.
		 */
		index(index): Promise<any>
		index$({ index }): Promise<any>

		/**
		 * Insert ELEMENTS at INDEX.
		 */
		insert(index): Promise<any>
		insert$({ index }): Promise<any>

		/**
		 * Get index of item which is nearest to y coordinate Y.
		 */
		nearest(y): Promise<any>
		nearest$({ y }): Promise<any>

		/**
		 * Remember the current X, Y coordinates.
		 */
		scan_mark(x, y): Promise<any>
		scan_mark$({ x, y }): Promise<any>

		/**
		 * Adjust the view of the listbox to 10 times the
		 *         difference between X and Y and the coordinates given in
		 *         scan_mark.
		 */
		scan_dragto(x, y): Promise<any>
		scan_dragto$({ x, y }): Promise<any>

		/**
		 * Scroll such that INDEX is visible.
		 */
		see(index): Promise<any>
		see$({ index }): Promise<any>

		/**
		 * Set the fixed end oft the selection to INDEX.
		 */
		selection_anchor(index): Promise<any>
		selection_anchor$({ index }): Promise<any>

		/**
		 * Clear the selection from FIRST to LAST (included).
		 */
		selection_clear(first, last?): Promise<any>
		selection_clear$({ first, last }: { first, last?}): Promise<any>

		/**
		 * Return True if INDEX is part of the selection.
		 */
		selection_includes(index): Promise<any>
		selection_includes$({ index }): Promise<any>

		/**
		 * Set the selection from FIRST to LAST (included) without
		 *         changing the currently selected elements.
		 */
		selection_set(first, last?): Promise<any>
		selection_set$({ first, last }: { first, last?}): Promise<any>

		/**
		 * Return the number of elements in the listbox.
		 */
		size(): Promise<any>
		size$($: {}): Promise<any>

		/**
		 * Return the resource value for an ITEM and an OPTION.
		 */
		itemcget(index, option): Promise<any>
		itemcget$({ index, option }): Promise<any>

		/**
		 * Configure resources of an ITEM.
		 * 
		 *         The values for resources are specified as keyword arguments.
		 *         To get an overview about the allowed keyword arguments
		 *         call the method without arguments.
		 *         Valid resource names: background, bg, foreground, fg,
		 *         selectbackground, selectforeground.
		 */
		itemconfigure(index, cnf?): Promise<any>
		itemconfigure$({ index, cnf }: { index, cnf?}): Promise<any>
		select_anchor
		select_includes
		select_set
	}

	/**
	 * Menu widget which allows displaying menu bars, pull-down menus and pop-up menus.
	 */

	/**
	 * Construct menu widget with the parent MASTER.
	 * 
	 *         Valid resource names: activebackground, activeborderwidth,
	 *         activeforeground, background, bd, bg, borderwidth, cursor,
	 *         disabledforeground, fg, font, foreground, postcommand, relief,
	 *         selectcolor, takefocus, tearoff, tearoffcommand, title, type.
	 */
	function Menu(master?, cnf?): Promise<IMenu>
	function Menu$({ master, cnf }: { master?, cnf?}): Promise<IMenu>
	interface IMenu extends IWidget {

		/**
		 * Post the menu at position X,Y with entry ENTRY.
		 */
		tk_popup(x, y, entry?): Promise<any>
		tk_popup$({ x, y, entry }: { x, y, entry?}): Promise<any>

		/**
		 * Activate entry at INDEX.
		 */
		activate(index): Promise<any>
		activate$({ index }): Promise<any>

		/**
		 * Internal function.
		 */
		add(itemType, cnf?): Promise<any>
		add$({ itemType, cnf }: { itemType, cnf?}): Promise<any>

		/**
		 * Add hierarchical menu item.
		 */
		add_cascade(cnf?): Promise<any>
		add_cascade$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Add checkbutton menu item.
		 */
		add_checkbutton(cnf?): Promise<any>
		add_checkbutton$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Add command menu item.
		 */
		add_command(cnf?): Promise<any>
		add_command$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Addd radio menu item.
		 */
		add_radiobutton(cnf?): Promise<any>
		add_radiobutton$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Add separator.
		 */
		add_separator(cnf?): Promise<any>
		add_separator$({ cnf }: { cnf?}): Promise<any>

		/**
		 * Internal function.
		 */
		insert(index, itemType, cnf?): Promise<any>
		insert$({ index, itemType, cnf }: { index, itemType, cnf?}): Promise<any>

		/**
		 * Add hierarchical menu item at INDEX.
		 */
		insert_cascade(index, cnf?): Promise<any>
		insert_cascade$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Add checkbutton menu item at INDEX.
		 */
		insert_checkbutton(index, cnf?): Promise<any>
		insert_checkbutton$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Add command menu item at INDEX.
		 */
		insert_command(index, cnf?): Promise<any>
		insert_command$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Addd radio menu item at INDEX.
		 */
		insert_radiobutton(index, cnf?): Promise<any>
		insert_radiobutton$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Add separator at INDEX.
		 */
		insert_separator(index, cnf?): Promise<any>
		insert_separator$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Delete menu items between INDEX1 and INDEX2 (included).
		 */
		delete(index1, index2?): Promise<any>
		delete$({ index1, index2 }: { index1, index2?}): Promise<any>

		/**
		 * Return the resource value of a menu item for OPTION at INDEX.
		 */
		entrycget(index, option): Promise<any>
		entrycget$({ index, option }): Promise<any>

		/**
		 * Configure a menu item at INDEX.
		 */
		entryconfigure(index, cnf?): Promise<any>
		entryconfigure$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Return the index of a menu item identified by INDEX.
		 */
		index(index): Promise<any>
		index$({ index }): Promise<any>

		/**
		 * Invoke a menu item identified by INDEX and execute
		 *         the associated command.
		 */
		invoke(index): Promise<any>
		invoke$({ index }): Promise<any>

		/**
		 * Display a menu at position X,Y.
		 */
		post(x, y): Promise<any>
		post$({ x, y }): Promise<any>

		/**
		 * Return the type of the menu item at INDEX.
		 */
		type(index): Promise<any>
		type$({ index }): Promise<any>

		/**
		 * Unmap a menu.
		 */
		unpost(): Promise<any>
		unpost$($: {}): Promise<any>

		/**
		 * Return the x-position of the leftmost pixel of the menu item
		 *         at INDEX.
		 */
		xposition(index): Promise<any>
		xposition$({ index }): Promise<any>

		/**
		 * Return the y-position of the topmost pixel of the menu item at INDEX.
		 */
		yposition(index): Promise<any>
		yposition$({ index }): Promise<any>
		entryconfig
	}

	/**
	 * Menubutton widget, obsolete since Tk8.0.
	 */
	function Menubutton(master?, cnf?): Promise<IMenubutton>
	function Menubutton$({ master, cnf }: { master?, cnf?}): Promise<IMenubutton>
	interface IMenubutton extends IWidget {
	}

	/**
	 * Message widget to display multiline text. Obsolete since Label does it too.
	 */
	function Message(master?, cnf?): Promise<IMessage>
	function Message$({ master, cnf }: { master?, cnf?}): Promise<IMessage>
	interface IMessage extends IWidget {
	}

	/**
	 * Radiobutton widget which shows only one of several buttons in on-state.
	 */

	/**
	 * Construct a radiobutton widget with the parent MASTER.
	 * 
	 *         Valid resource names: activebackground, activeforeground, anchor,
	 *         background, bd, bg, bitmap, borderwidth, command, cursor,
	 *         disabledforeground, fg, font, foreground, height,
	 *         highlightbackground, highlightcolor, highlightthickness, image,
	 *         indicatoron, justify, padx, pady, relief, selectcolor, selectimage,
	 *         state, takefocus, text, textvariable, underline, value, variable,
	 *         width, wraplength.
	 */
	function Radiobutton(master?, cnf?): Promise<IRadiobutton>
	function Radiobutton$({ master, cnf }: { master?, cnf?}): Promise<IRadiobutton>
	interface IRadiobutton extends IWidget {

		/**
		 * Put the button in off-state.
		 */
		deselect(): Promise<any>
		deselect$($: {}): Promise<any>

		/**
		 * Flash the button.
		 */
		flash(): Promise<any>
		flash$($: {}): Promise<any>

		/**
		 * Toggle the button and invoke a command if given as resource.
		 */
		invoke(): Promise<any>
		invoke$($: {}): Promise<any>

		/**
		 * Put the button in on-state.
		 */
		select(): Promise<any>
		select$($: {}): Promise<any>
	}

	/**
	 * Scale widget which can display a numerical scale.
	 */

	/**
	 * Construct a scale widget with the parent MASTER.
	 * 
	 *         Valid resource names: activebackground, background, bigincrement, bd,
	 *         bg, borderwidth, command, cursor, digits, fg, font, foreground, from,
	 *         highlightbackground, highlightcolor, highlightthickness, label,
	 *         length, orient, relief, repeatdelay, repeatinterval, resolution,
	 *         showvalue, sliderlength, sliderrelief, state, takefocus,
	 *         tickinterval, to, troughcolor, variable, width.
	 */
	function Scale(master?, cnf?): Promise<IScale>
	function Scale$({ master, cnf }: { master?, cnf?}): Promise<IScale>
	interface IScale extends IWidget {

		/**
		 * Get the current value as integer or float.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>

		/**
		 * Set the value to VALUE.
		 */
		set(value): Promise<any>
		set$({ value }): Promise<any>

		/**
		 * Return a tuple (X,Y) of the point along the centerline of the
		 *         trough that corresponds to VALUE or the current value if None is
		 *         given.
		 */
		coords(value?): Promise<any>
		coords$({ value }: { value?}): Promise<any>

		/**
		 * Return where the point X,Y lies. Valid return values are "slider",
		 *         "though1" and "though2".
		 */
		identify(x, y): Promise<any>
		identify$({ x, y }): Promise<any>
	}

	/**
	 * Scrollbar widget which displays a slider at a certain position.
	 */

	/**
	 * Construct a scrollbar widget with the parent MASTER.
	 * 
	 *         Valid resource names: activebackground, activerelief,
	 *         background, bd, bg, borderwidth, command, cursor,
	 *         elementborderwidth, highlightbackground,
	 *         highlightcolor, highlightthickness, jump, orient,
	 *         relief, repeatdelay, repeatinterval, takefocus,
	 *         troughcolor, width.
	 */
	function Scrollbar(master?, cnf?): Promise<IScrollbar>
	function Scrollbar$({ master, cnf }: { master?, cnf?}): Promise<IScrollbar>
	interface IScrollbar extends IWidget {

		/**
		 * Marks the element indicated by index as active.
		 *         The only index values understood by this method are "arrow1",
		 *         "slider", or "arrow2".  If any other value is specified then no
		 *         element of the scrollbar will be active.  If index is not specified,
		 *         the method returns the name of the element that is currently active,
		 *         or None if no element is active.
		 */
		activate(index?): Promise<any>
		activate$({ index }: { index?}): Promise<any>

		/**
		 * Return the fractional change of the scrollbar setting if it
		 *         would be moved by DELTAX or DELTAY pixels.
		 */
		delta(deltax, deltay): Promise<any>
		delta$({ deltax, deltay }): Promise<any>

		/**
		 * Return the fractional value which corresponds to a slider
		 *         position of X,Y.
		 */
		fraction(x, y): Promise<any>
		fraction$({ x, y }): Promise<any>

		/**
		 * Return the element under position X,Y as one of
		 *         "arrow1","slider","arrow2" or "".
		 */
		identify(x, y): Promise<any>
		identify$({ x, y }): Promise<any>

		/**
		 * Return the current fractional values (upper and lower end)
		 *         of the slider position.
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>

		/**
		 * Set the fractional values of the slider position (upper and
		 *         lower ends as value between 0 and 1).
		 */
		set(first, last): Promise<any>
		set$({ first, last }): Promise<any>
	}

	/**
	 * Text widget which can display text in various forms.
	 */

	/**
	 * Construct a text widget with the parent MASTER.
	 * 
	 *         STANDARD OPTIONS
	 * 
	 *             background, borderwidth, cursor,
	 *             exportselection, font, foreground,
	 *             highlightbackground, highlightcolor,
	 *             highlightthickness, insertbackground,
	 *             insertborderwidth, insertofftime,
	 *             insertontime, insertwidth, padx, pady,
	 *             relief, selectbackground,
	 *             selectborderwidth, selectforeground,
	 *             setgrid, takefocus,
	 *             xscrollcommand, yscrollcommand,
	 * 
	 *         WIDGET-SPECIFIC OPTIONS
	 * 
	 *             autoseparators, height, maxundo,
	 *             spacing1, spacing2, spacing3,
	 *             state, tabs, undo, width, wrap,
	 * 
	 *         
	 */
	function Text(master?, cnf?): Promise<IText>
	function Text$({ master, cnf }: { master?, cnf?}): Promise<IText>
	interface IText extends IWidget, IXView, IYView {

		/**
		 * Return a tuple of (x,y,width,height) which gives the bounding
		 *         box of the visible part of the character at the given index.
		 */
		bbox(index): Promise<any>
		bbox$({ index }): Promise<any>

		/**
		 * Return whether between index INDEX1 and index INDEX2 the
		 *         relation OP is satisfied. OP is one of <, <=, ==, >=, >, or !=.
		 */
		compare(index1, op, index2): Promise<any>
		compare$({ index1, op, index2 }): Promise<any>

		/**
		 * Counts the number of relevant things between the two indices.
		 *         If index1 is after index2, the result will be a negative number
		 *         (and this holds for each of the possible options).
		 * 
		 *         The actual items which are counted depends on the options given by
		 *         args. The result is a list of integers, one for the result of each
		 *         counting option given. Valid counting options are "chars",
		 *         "displaychars", "displayindices", "displaylines", "indices",
		 *         "lines", "xpixels" and "ypixels". There is an additional possible
		 *         option "update", which if given then all subsequent options ensure
		 *         that any possible out of date information is recalculated.
		 */
		count(index1, index2): Promise<any>
		count$({ index1, index2 }): Promise<any>

		/**
		 * Turn on the internal consistency checks of the B-Tree inside the text
		 *         widget according to BOOLEAN.
		 */
		debug(boolean?): Promise<any>
		debug$({ boolean }: { boolean?}): Promise<any>

		/**
		 * Delete the characters between INDEX1 and INDEX2 (not included).
		 */
		delete(index1, index2?): Promise<any>
		delete$({ index1, index2 }: { index1, index2?}): Promise<any>

		/**
		 * Return tuple (x,y,width,height,baseline) giving the bounding box
		 *         and baseline position of the visible part of the line containing
		 *         the character at INDEX.
		 */
		dlineinfo(index): Promise<any>
		dlineinfo$({ index }): Promise<any>

		/**
		 * Return the contents of the widget between index1 and index2.
		 * 
		 *         The type of contents returned in filtered based on the keyword
		 *         parameters; if 'all', 'image', 'mark', 'tag', 'text', or 'window' are
		 *         given and true, then the corresponding items are returned. The result
		 *         is a list of triples of the form (key, value, index). If none of the
		 *         keywords are true then 'all' is used by default.
		 * 
		 *         If the 'command' argument is given, it is called once for each element
		 *         of the list of triples, with the values of each triple serving as the
		 *         arguments to the function. In this case the list is not returned.
		 */
		dump(index1, index2?, command?): Promise<any>
		dump$({ index1, index2, command }: { index1, index2?, command?}): Promise<any>

		/**
		 * Internal method
		 * 
		 *         This method controls the undo mechanism and
		 *         the modified flag. The exact behavior of the
		 *         command depends on the option argument that
		 *         follows the edit argument. The following forms
		 *         of the command are currently supported:
		 * 
		 *         edit_modified, edit_redo, edit_reset, edit_separator
		 *         and edit_undo
		 * 
		 *         
		 */
		edit(): Promise<any>
		edit$($: {}): Promise<any>

		/**
		 * Get or Set the modified flag
		 * 
		 *         If arg is not specified, returns the modified
		 *         flag of the widget. The insert, delete, edit undo and
		 *         edit redo commands or the user can set or clear the
		 *         modified flag. If boolean is specified, sets the
		 *         modified flag of the widget to arg.
		 *         
		 */
		edit_modified(arg?): Promise<any>
		edit_modified$({ arg }: { arg?}): Promise<any>

		/**
		 * Redo the last undone edit
		 * 
		 *         When the undo option is true, reapplies the last
		 *         undone edits provided no other edits were done since
		 *         then. Generates an error when the redo stack is empty.
		 *         Does nothing when the undo option is false.
		 *         
		 */
		edit_redo(): Promise<any>
		edit_redo$($: {}): Promise<any>

		/**
		 * Clears the undo and redo stacks
		 *         
		 */
		edit_reset(): Promise<any>
		edit_reset$($: {}): Promise<any>

		/**
		 * Inserts a separator (boundary) on the undo stack.
		 * 
		 *         Does nothing when the undo option is false
		 *         
		 */
		edit_separator(): Promise<any>
		edit_separator$($: {}): Promise<any>

		/**
		 * Undoes the last edit action
		 * 
		 *         If the undo option is true. An edit action is defined
		 *         as all the insert and delete commands that are recorded
		 *         on the undo stack in between two separators. Generates
		 *         an error when the undo stack is empty. Does nothing
		 *         when the undo option is false
		 *         
		 */
		edit_undo(): Promise<any>
		edit_undo$($: {}): Promise<any>

		/**
		 * Return the text from INDEX1 to INDEX2 (not included).
		 */
		get(index1, index2?): Promise<any>
		get$({ index1, index2 }: { index1, index2?}): Promise<any>

		/**
		 * Return the value of OPTION of an embedded image at INDEX.
		 */
		image_cget(index, option): Promise<any>
		image_cget$({ index, option }): Promise<any>

		/**
		 * Configure an embedded image at INDEX.
		 */
		image_configure(index, cnf?): Promise<any>
		image_configure$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Create an embedded image at INDEX.
		 */
		image_create(index, cnf?): Promise<any>
		image_create$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Return all names of embedded images in this widget.
		 */
		image_names(): Promise<any>
		image_names$($: {}): Promise<any>

		/**
		 * Return the index in the form line.char for INDEX.
		 */
		index(index): Promise<any>
		index$({ index }): Promise<any>

		/**
		 * Insert CHARS before the characters at INDEX. An additional
		 *         tag can be given in ARGS. Additional CHARS and tags can follow in ARGS.
		 */
		insert(index, chars): Promise<any>
		insert$({ index, chars }): Promise<any>

		/**
		 * Change the gravity of a mark MARKNAME to DIRECTION (LEFT or RIGHT).
		 *         Return the current value if None is given for DIRECTION.
		 */
		mark_gravity(markName, direction?): Promise<any>
		mark_gravity$({ markName, direction }: { markName, direction?}): Promise<any>

		/**
		 * Return all mark names.
		 */
		mark_names(): Promise<any>
		mark_names$($: {}): Promise<any>

		/**
		 * Set mark MARKNAME before the character at INDEX.
		 */
		mark_set(markName, index): Promise<any>
		mark_set$({ markName, index }): Promise<any>

		/**
		 * Delete all marks in MARKNAMES.
		 */
		mark_unset(): Promise<any>
		mark_unset$($: {}): Promise<any>

		/**
		 * Return the name of the next mark after INDEX.
		 */
		mark_next(index): Promise<any>
		mark_next$({ index }): Promise<any>

		/**
		 * Return the name of the previous mark before INDEX.
		 */
		mark_previous(index): Promise<any>
		mark_previous$({ index }): Promise<any>

		/**
		 * Creates a peer text widget with the given newPathName, and any
		 *         optional standard configuration options. By default the peer will
		 *         have the same start and end line as the parent widget, but
		 *         these can be overridden with the standard configuration options.
		 */
		peer_create(newPathName, cnf?): Promise<any>
		peer_create$({ newPathName, cnf }: { newPathName, cnf?}): Promise<any>

		/**
		 * Returns a list of peers of this widget (this does not include
		 *         the widget itself).
		 */
		peer_names(): Promise<any>
		peer_names$($: {}): Promise<any>

		/**
		 * Replaces the range of characters between index1 and index2 with
		 *         the given characters and tags specified by args.
		 * 
		 *         See the method insert for some more information about args, and the
		 *         method delete for information about the indices.
		 */
		replace(index1, index2, chars): Promise<any>
		replace$({ index1, index2, chars }): Promise<any>

		/**
		 * Remember the current X, Y coordinates.
		 */
		scan_mark(x, y): Promise<any>
		scan_mark$({ x, y }): Promise<any>

		/**
		 * Adjust the view of the text to 10 times the
		 *         difference between X and Y and the coordinates given in
		 *         scan_mark.
		 */
		scan_dragto(x, y): Promise<any>
		scan_dragto$({ x, y }): Promise<any>

		/**
		 * Search PATTERN beginning from INDEX until STOPINDEX.
		 *         Return the index of the first character of a match or an
		 *         empty string.
		 */
		search(pattern, index, stopindex?, forwards?, backwards?, exact?, regexp?, nocase?, count?, elide?): Promise<any>
		search$({ pattern, index, stopindex, forwards, backwards, exact, regexp, nocase, count, elide }: { pattern, index, stopindex?, forwards?, backwards?, exact?, regexp?, nocase?, count?, elide?}): Promise<any>

		/**
		 * Scroll such that the character at INDEX is visible.
		 */
		see(index): Promise<any>
		see$({ index }): Promise<any>

		/**
		 * Add tag TAGNAME to all characters between INDEX1 and index2 in ARGS.
		 *         Additional pairs of indices may follow in ARGS.
		 */
		tag_add(tagName, index1): Promise<any>
		tag_add$({ tagName, index1 }): Promise<any>

		/**
		 * Unbind for all characters with TAGNAME for event SEQUENCE  the
		 *         function identified with FUNCID.
		 */
		tag_unbind(tagName, sequence, funcid?): Promise<any>
		tag_unbind$({ tagName, sequence, funcid }: { tagName, sequence, funcid?}): Promise<any>

		/**
		 * Bind to all characters with TAGNAME at event SEQUENCE a call to function FUNC.
		 * 
		 *         An additional boolean parameter ADD specifies whether FUNC will be
		 *         called additionally to the other bound function or whether it will
		 *         replace the previous function. See bind for the return value.
		 */
		tag_bind(tagName, sequence, func, add?): Promise<any>
		tag_bind$({ tagName, sequence, func, add }: { tagName, sequence, func, add?}): Promise<any>

		/**
		 * Return the value of OPTION for tag TAGNAME.
		 */
		tag_cget(tagName, option): Promise<any>
		tag_cget$({ tagName, option }): Promise<any>

		/**
		 * Configure a tag TAGNAME.
		 */
		tag_configure(tagName, cnf?): Promise<any>
		tag_configure$({ tagName, cnf }: { tagName, cnf?}): Promise<any>

		/**
		 * Delete all tags in TAGNAMES.
		 */
		tag_delete(): Promise<any>
		tag_delete$($: {}): Promise<any>

		/**
		 * Change the priority of tag TAGNAME such that it is lower
		 *         than the priority of BELOWTHIS.
		 */
		tag_lower(tagName, belowThis?): Promise<any>
		tag_lower$({ tagName, belowThis }: { tagName, belowThis?}): Promise<any>

		/**
		 * Return a list of all tag names.
		 */
		tag_names(index?): Promise<any>
		tag_names$({ index }: { index?}): Promise<any>

		/**
		 * Return a list of start and end index for the first sequence of
		 *         characters between INDEX1 and INDEX2 which all have tag TAGNAME.
		 *         The text is searched forward from INDEX1.
		 */
		tag_nextrange(tagName, index1, index2?): Promise<any>
		tag_nextrange$({ tagName, index1, index2 }: { tagName, index1, index2?}): Promise<any>

		/**
		 * Return a list of start and end index for the first sequence of
		 *         characters between INDEX1 and INDEX2 which all have tag TAGNAME.
		 *         The text is searched backwards from INDEX1.
		 */
		tag_prevrange(tagName, index1, index2?): Promise<any>
		tag_prevrange$({ tagName, index1, index2 }: { tagName, index1, index2?}): Promise<any>

		/**
		 * Change the priority of tag TAGNAME such that it is higher
		 *         than the priority of ABOVETHIS.
		 */
		tag_raise(tagName, aboveThis?): Promise<any>
		tag_raise$({ tagName, aboveThis }: { tagName, aboveThis?}): Promise<any>

		/**
		 * Return a list of ranges of text which have tag TAGNAME.
		 */
		tag_ranges(tagName): Promise<any>
		tag_ranges$({ tagName }): Promise<any>

		/**
		 * Remove tag TAGNAME from all characters between INDEX1 and INDEX2.
		 */
		tag_remove(tagName, index1, index2?): Promise<any>
		tag_remove$({ tagName, index1, index2 }: { tagName, index1, index2?}): Promise<any>

		/**
		 * Return the value of OPTION of an embedded window at INDEX.
		 */
		window_cget(index, option): Promise<any>
		window_cget$({ index, option }): Promise<any>

		/**
		 * Configure an embedded window at INDEX.
		 */
		window_configure(index, cnf?): Promise<any>
		window_configure$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Create a window at INDEX.
		 */
		window_create(index, cnf?): Promise<any>
		window_create$({ index, cnf }: { index, cnf?}): Promise<any>

		/**
		 * Return all names of embedded windows in this widget.
		 */
		window_names(): Promise<any>
		window_names$($: {}): Promise<any>

		/**
		 * Obsolete function, use see.
		 */
		yview_pickplace(): Promise<any>
		yview_pickplace$($: {}): Promise<any>
		tag_config
		window_config
	}

	/**
	 * Internal class. It wraps the command in the widget OptionMenu.
	 */
	interface I_setit {
	}

	/**
	 * OptionMenu which allows the user to select a value from a menu.
	 */

	/**
	 * Construct an optionmenu widget with the parent MASTER, with
	 *         the resource textvariable set to VARIABLE, the initially selected
	 *         value VALUE, the other menu values VALUES and an additional
	 *         keyword argument command.
	 */
	function OptionMenu(master, variable, value): Promise<IOptionMenu>
	function OptionMenu$({ master, variable, value }): Promise<IOptionMenu>
	interface IOptionMenu extends IMenubutton {

		/**
		 * Destroy this widget and the associated menu.
		 */
		destroy(): Promise<any>
		destroy$($: {}): Promise<any>
	}

	/**
	 * Base class for images.
	 */
	function Image(imgtype, name?, cnf?, master?): Promise<IImage>
	function Image$({ imgtype, name, cnf, master }: { imgtype, name?, cnf?, master?}): Promise<IImage>
	interface IImage {

		/**
		 * Configure the image.
		 */
		configure(): Promise<any>
		configure$($: {}): Promise<any>

		/**
		 * Return the height of the image.
		 */
		height(): Promise<any>
		height$($: {}): Promise<any>

		/**
		 * Return the type of the image, e.g. "photo" or "bitmap".
		 */
		type(): Promise<any>
		type$($: {}): Promise<any>

		/**
		 * Return the width of the image.
		 */
		width(): Promise<any>
		width$($: {}): Promise<any>
	}

	/**
	 * Widget which can display images in PGM, PPM, GIF, PNG format.
	 */

	/**
	 * Create an image with NAME.
	 * 
	 *         Valid resource names: data, format, file, gamma, height, palette,
	 *         width.
	 */
	function PhotoImage(name?, cnf?, master?): Promise<IPhotoImage>
	function PhotoImage$({ name, cnf, master }: { name?, cnf?, master?}): Promise<IPhotoImage>
	interface IPhotoImage extends IImage {

		/**
		 * Display a transparent image.
		 */
		blank(): Promise<any>
		blank$($: {}): Promise<any>

		/**
		 * Return the value of OPTION.
		 */
		cget(option): Promise<any>
		cget$({ option }): Promise<any>

		/**
		 * Return a new PhotoImage with the same image as this widget.
		 */
		copy(): Promise<any>
		copy$($: {}): Promise<any>

		/**
		 * Return a new PhotoImage with the same image as this widget
		 *         but zoom it with a factor of x in the X direction and y in the Y
		 *         direction.  If y is not given, the default value is the same as x.
		 *         
		 */
		zoom(x, y?): Promise<any>
		zoom$({ x, y }: { x, y?}): Promise<any>

		/**
		 * Return a new PhotoImage based on the same image as this widget
		 *         but use only every Xth or Yth pixel.  If y is not given, the
		 *         default value is the same as x.
		 *         
		 */
		subsample(x, y?): Promise<any>
		subsample$({ x, y }: { x, y?}): Promise<any>

		/**
		 * Return the color (red, green, blue) of the pixel at X,Y.
		 */
		get(x, y): Promise<any>
		get$({ x, y }): Promise<any>

		/**
		 * Put row formatted colors to image starting from
		 *         position TO, e.g. image.put("{red green} {blue yellow}", to=(4,6))
		 */
		put(data, to?): Promise<any>
		put$({ data, to }: { data, to?}): Promise<any>

		/**
		 * Write image to file FILENAME in FORMAT starting from
		 *         position FROM_COORDS.
		 */
		write(filename, format?, from_coords?): Promise<any>
		write$({ filename, format, from_coords }: { filename, format?, from_coords?}): Promise<any>

		/**
		 * Return True if the pixel at x,y is transparent.
		 */
		transparency_get(x, y): Promise<any>
		transparency_get$({ x, y }): Promise<any>

		/**
		 * Set the transparency of the pixel at x,y.
		 */
		transparency_set(x, y, boolean): Promise<any>
		transparency_set$({ x, y, boolean }): Promise<any>
	}

	/**
	 * Widget which can display images in XBM format.
	 */

	/**
	 * Create a bitmap with NAME.
	 * 
	 *         Valid resource names: background, data, file, foreground, maskdata, maskfile.
	 */
	function BitmapImage(name?, cnf?, master?): Promise<IBitmapImage>
	function BitmapImage$({ name, cnf, master }: { name?, cnf?, master?}): Promise<IBitmapImage>
	interface IBitmapImage extends IImage {
	}

	/**
	 * spinbox widget.
	 */

	/**
	 * Construct a spinbox widget with the parent MASTER.
	 * 
	 *         STANDARD OPTIONS
	 * 
	 *             activebackground, background, borderwidth,
	 *             cursor, exportselection, font, foreground,
	 *             highlightbackground, highlightcolor,
	 *             highlightthickness, insertbackground,
	 *             insertborderwidth, insertofftime,
	 *             insertontime, insertwidth, justify, relief,
	 *             repeatdelay, repeatinterval,
	 *             selectbackground, selectborderwidth
	 *             selectforeground, takefocus, textvariable
	 *             xscrollcommand.
	 * 
	 *         WIDGET-SPECIFIC OPTIONS
	 * 
	 *             buttonbackground, buttoncursor,
	 *             buttondownrelief, buttonuprelief,
	 *             command, disabledbackground,
	 *             disabledforeground, format, from,
	 *             invalidcommand, increment,
	 *             readonlybackground, state, to,
	 *             validate, validatecommand values,
	 *             width, wrap,
	 *         
	 */
	function Spinbox(master?, cnf?): Promise<ISpinbox>
	function Spinbox$({ master, cnf }: { master?, cnf?}): Promise<ISpinbox>
	interface ISpinbox extends IWidget, IXView {

		/**
		 * Return a tuple of X1,Y1,X2,Y2 coordinates for a
		 *         rectangle which encloses the character given by index.
		 * 
		 *         The first two elements of the list give the x and y
		 *         coordinates of the upper-left corner of the screen
		 *         area covered by the character (in pixels relative
		 *         to the widget) and the last two elements give the
		 *         width and height of the character, in pixels. The
		 *         bounding box may refer to a region outside the
		 *         visible area of the window.
		 *         
		 */
		bbox(index): Promise<any>
		bbox$({ index }): Promise<any>

		/**
		 * Delete one or more elements of the spinbox.
		 * 
		 *         First is the index of the first character to delete,
		 *         and last is the index of the character just after
		 *         the last one to delete. If last isn't specified it
		 *         defaults to first+1, i.e. a single character is
		 *         deleted.  This command returns an empty string.
		 *         
		 */
		delete(first, last?): Promise<any>
		delete$({ first, last }: { first, last?}): Promise<any>

		/**
		 * Returns the spinbox's string
		 */
		get(): Promise<any>
		get$($: {}): Promise<any>

		/**
		 * Alter the position of the insertion cursor.
		 * 
		 *         The insertion cursor will be displayed just before
		 *         the character given by index. Returns an empty string
		 *         
		 */
		icursor(index): Promise<any>
		icursor$({ index }): Promise<any>

		/**
		 * Returns the name of the widget at position x, y
		 * 
		 *         Return value is one of: none, buttondown, buttonup, entry
		 *         
		 */
		identify(x, y): Promise<any>
		identify$({ x, y }): Promise<any>

		/**
		 * Returns the numerical index corresponding to index
		 *         
		 */
		index(index): Promise<any>
		index$({ index }): Promise<any>

		/**
		 * Insert string s at index
		 * 
		 *          Returns an empty string.
		 *         
		 */
		insert(index, s): Promise<any>
		insert$({ index, s }): Promise<any>

		/**
		 * Causes the specified element to be invoked
		 * 
		 *         The element could be buttondown or buttonup
		 *         triggering the action associated with it.
		 *         
		 */
		invoke(element): Promise<any>
		invoke$({ element }): Promise<any>

		/**
		 * Internal function.
		 */
		scan(): Promise<any>
		scan$($: {}): Promise<any>

		/**
		 * Records x and the current view in the spinbox window;
		 * 
		 *         used in conjunction with later scan dragto commands.
		 *         Typically this command is associated with a mouse button
		 *         press in the widget. It returns an empty string.
		 *         
		 */
		scan_mark(x): Promise<any>
		scan_mark$({ x }): Promise<any>

		/**
		 * Compute the difference between the given x argument
		 *         and the x argument to the last scan mark command
		 * 
		 *         It then adjusts the view left or right by 10 times the
		 *         difference in x-coordinates. This command is typically
		 *         associated with mouse motion events in the widget, to
		 *         produce the effect of dragging the spinbox at high speed
		 *         through the window. The return value is an empty string.
		 *         
		 */
		scan_dragto(x): Promise<any>
		scan_dragto$({ x }): Promise<any>

		/**
		 * Internal function.
		 */
		selection(): Promise<any>
		selection$($: {}): Promise<any>

		/**
		 * Locate the end of the selection nearest to the character
		 *         given by index,
		 * 
		 *         Then adjust that end of the selection to be at index
		 *         (i.e including but not going beyond index). The other
		 *         end of the selection is made the anchor point for future
		 *         select to commands. If the selection isn't currently in
		 *         the spinbox, then a new selection is created to include
		 *         the characters between index and the most recent selection
		 *         anchor point, inclusive.
		 *         
		 */
		selection_adjust(index): Promise<any>
		selection_adjust$({ index }): Promise<any>

		/**
		 * Clear the selection
		 * 
		 *         If the selection isn't in this widget then the
		 *         command has no effect.
		 *         
		 */
		selection_clear(): Promise<any>
		selection_clear$($: {}): Promise<any>

		/**
		 * Sets or gets the currently selected element.
		 * 
		 *         If a spinbutton element is specified, it will be
		 *         displayed depressed.
		 *         
		 */
		selection_element(element?): Promise<any>
		selection_element$({ element }: { element?}): Promise<any>

		/**
		 * Set the fixed end of a selection to INDEX.
		 */
		selection_from(index): Promise<any>
		selection_from$({ index }): Promise<any>

		/**
		 * Return True if there are characters selected in the spinbox, False
		 *         otherwise.
		 */
		selection_present(): Promise<any>
		selection_present$($: {}): Promise<any>

		/**
		 * Set the selection from START to END (not included).
		 */
		selection_range(start, end): Promise<any>
		selection_range$({ start, end }): Promise<any>

		/**
		 * Set the variable end of a selection to INDEX.
		 */
		selection_to(index): Promise<any>
		selection_to$({ index }): Promise<any>
	}

	/**
	 * labelframe widget.
	 */

	/**
	 * Construct a labelframe widget with the parent MASTER.
	 * 
	 *         STANDARD OPTIONS
	 * 
	 *             borderwidth, cursor, font, foreground,
	 *             highlightbackground, highlightcolor,
	 *             highlightthickness, padx, pady, relief,
	 *             takefocus, text
	 * 
	 *         WIDGET-SPECIFIC OPTIONS
	 * 
	 *             background, class, colormap, container,
	 *             height, labelanchor, labelwidget,
	 *             visual, width
	 *         
	 */
	function LabelFrame(master?, cnf?): Promise<ILabelFrame>
	function LabelFrame$({ master, cnf }: { master?, cnf?}): Promise<ILabelFrame>
	interface ILabelFrame extends IWidget {
	}

	/**
	 * panedwindow widget.
	 */

	/**
	 * Construct a panedwindow widget with the parent MASTER.
	 * 
	 *         STANDARD OPTIONS
	 * 
	 *             background, borderwidth, cursor, height,
	 *             orient, relief, width
	 * 
	 *         WIDGET-SPECIFIC OPTIONS
	 * 
	 *             handlepad, handlesize, opaqueresize,
	 *             sashcursor, sashpad, sashrelief,
	 *             sashwidth, showhandle,
	 *         
	 */
	function PanedWindow(master?, cnf?): Promise<IPanedWindow>
	function PanedWindow$({ master, cnf }: { master?, cnf?}): Promise<IPanedWindow>
	interface IPanedWindow extends IWidget {

		/**
		 * Add a child widget to the panedwindow in a new pane.
		 * 
		 *         The child argument is the name of the child widget
		 *         followed by pairs of arguments that specify how to
		 *         manage the windows. The possible options and values
		 *         are the ones accepted by the paneconfigure method.
		 *         
		 */
		add(child): Promise<any>
		add$({ child }): Promise<any>

		/**
		 * Remove the pane containing child from the panedwindow
		 * 
		 *         All geometry management options for child will be forgotten.
		 *         
		 */
		remove(child): Promise<any>
		remove$({ child }): Promise<any>

		/**
		 * Identify the panedwindow component at point x, y
		 * 
		 *         If the point is over a sash or a sash handle, the result
		 *         is a two element list containing the index of the sash or
		 *         handle, and a word indicating whether it is over a sash
		 *         or a handle, such as {0 sash} or {2 handle}. If the point
		 *         is over any other part of the panedwindow, the result is
		 *         an empty list.
		 *         
		 */
		identify(x, y): Promise<any>
		identify$({ x, y }): Promise<any>

		/**
		 * Internal function.
		 */
		proxy(): Promise<any>
		proxy$($: {}): Promise<any>

		/**
		 * Return the x and y pair of the most recent proxy location
		 *         
		 */
		proxy_coord(): Promise<any>
		proxy_coord$($: {}): Promise<any>

		/**
		 * Remove the proxy from the display.
		 *         
		 */
		proxy_forget(): Promise<any>
		proxy_forget$($: {}): Promise<any>

		/**
		 * Place the proxy at the given x and y coordinates.
		 *         
		 */
		proxy_place(x, y): Promise<any>
		proxy_place$({ x, y }): Promise<any>

		/**
		 * Internal function.
		 */
		sash(): Promise<any>
		sash$($: {}): Promise<any>

		/**
		 * Return the current x and y pair for the sash given by index.
		 * 
		 *         Index must be an integer between 0 and 1 less than the
		 *         number of panes in the panedwindow. The coordinates given are
		 *         those of the top left corner of the region containing the sash.
		 *         pathName sash dragto index x y This command computes the
		 *         difference between the given coordinates and the coordinates
		 *         given to the last sash coord command for the given sash. It then
		 *         moves that sash the computed difference. The return value is the
		 *         empty string.
		 *         
		 */
		sash_coord(index): Promise<any>
		sash_coord$({ index }): Promise<any>

		/**
		 * Records x and y for the sash given by index;
		 * 
		 *         Used in conjunction with later dragto commands to move the sash.
		 *         
		 */
		sash_mark(index): Promise<any>
		sash_mark$({ index }): Promise<any>

		/**
		 * Place the sash given by index at the given coordinates
		 *         
		 */
		sash_place(index, x, y): Promise<any>
		sash_place$({ index, x, y }): Promise<any>

		/**
		 * Query a management option for window.
		 * 
		 *         Option may be any value allowed by the paneconfigure subcommand
		 *         
		 */
		panecget(child, option): Promise<any>
		panecget$({ child, option }): Promise<any>

		/**
		 * Query or modify the management options for window.
		 * 
		 *         If no option is specified, returns a list describing all
		 *         of the available options for pathName.  If option is
		 *         specified with no value, then the command returns a list
		 *         describing the one named option (this list will be identical
		 *         to the corresponding sublist of the value returned if no
		 *         option is specified). If one or more option-value pairs are
		 *         specified, then the command modifies the given widget
		 *         option(s) to have the given value(s); in this case the
		 *         command returns an empty string. The following options
		 *         are supported:
		 * 
		 *         after window
		 *             Insert the window after the window specified. window
		 *             should be the name of a window already managed by pathName.
		 *         before window
		 *             Insert the window before the window specified. window
		 *             should be the name of a window already managed by pathName.
		 *         height size
		 *             Specify a height for the window. The height will be the
		 *             outer dimension of the window including its border, if
		 *             any. If size is an empty string, or if -height is not
		 *             specified, then the height requested internally by the
		 *             window will be used initially; the height may later be
		 *             adjusted by the movement of sashes in the panedwindow.
		 *             Size may be any value accepted by Tk_GetPixels.
		 *         minsize n
		 *             Specifies that the size of the window cannot be made
		 *             less than n. This constraint only affects the size of
		 *             the widget in the paned dimension -- the x dimension
		 *             for horizontal panedwindows, the y dimension for
		 *             vertical panedwindows. May be any value accepted by
		 *             Tk_GetPixels.
		 *         padx n
		 *             Specifies a non-negative value indicating how much
		 *             extra space to leave on each side of the window in
		 *             the X-direction. The value may have any of the forms
		 *             accepted by Tk_GetPixels.
		 *         pady n
		 *             Specifies a non-negative value indicating how much
		 *             extra space to leave on each side of the window in
		 *             the Y-direction. The value may have any of the forms
		 *             accepted by Tk_GetPixels.
		 *         sticky style
		 *             If a window's pane is larger than the requested
		 *             dimensions of the window, this option may be used
		 *             to position (or stretch) the window within its pane.
		 *             Style is a string that contains zero or more of the
		 *             characters n, s, e or w. The string can optionally
		 *             contains spaces or commas, but they are ignored. Each
		 *             letter refers to a side (north, south, east, or west)
		 *             that the window will "stick" to. If both n and s
		 *             (or e and w) are specified, the window will be
		 *             stretched to fill the entire height (or width) of
		 *             its cavity.
		 *         width size
		 *             Specify a width for the window. The width will be
		 *             the outer dimension of the window including its
		 *             border, if any. If size is an empty string, or
		 *             if -width is not specified, then the width requested
		 *             internally by the window will be used initially; the
		 *             width may later be adjusted by the movement of sashes
		 *             in the panedwindow. Size may be any value accepted by
		 *             Tk_GetPixels.
		 * 
		 *         
		 */
		paneconfigure(tagOrId, cnf?): Promise<any>
		paneconfigure$({ tagOrId, cnf }: { tagOrId, cnf?}): Promise<any>

		/**
		 * Returns an ordered list of the child panes.
		 */
		panes(): Promise<any>
		panes$($: {}): Promise<any>
		paneconfig
	}
	let TclError: Promise<any>
	let wantobjects: Promise<any>
	let TkVersion: Promise<any>
	let TclVersion: Promise<any>
	let READABLE: Promise<any>
	let WRITABLE: Promise<any>
	let EXCEPTION: Promise<any>
	module colorchooser {
		var _

		/**
		 * Display dialog window for selection of a color.
		 * 
		 *     Convenience wrapper for the Chooser class.  Displays the color
		 *     chooser dialog with color as the initial value.
		 *     
		 */
		function askcolor(color?): Promise<any>
		function askcolor$({ color }: { color?}): Promise<any>

		/**
		 * Create a dialog for the tk_chooseColor command.
		 * 
		 *     Args:
		 *         master: The master widget for this dialog.  If not provided,
		 *             defaults to options['parent'] (if defined).
		 *         options: Dictionary of options for the tk_chooseColor call.
		 *             initialcolor: Specifies the selected color when the
		 *                 dialog is first displayed.  This can be a tk color
		 *                 string or a 3-tuple of ints in the range (0, 255)
		 *                 for an RGB triplet.
		 *             parent: The parent window of the color dialog.  The
		 *                 color dialog is displayed on top of this.
		 *             title: A string for the title of the dialog box.
		 *     
		 */
		interface IChooser {
			command
		}
	}
	module commondialog {
		var _
		function Dialog(master?): Promise<IDialog>
		function Dialog$({ master }: { master?}): Promise<IDialog>
		interface IDialog {
			show(): Promise<any>
			show$($: {}): Promise<any>
			command
		}
	}
	module constants {
		var _
		let NO: Promise<any>
		let FALSE: Promise<any>
		let OFF: Promise<any>
		let YES: Promise<any>
		let TRUE: Promise<any>
		let ON: Promise<any>
		let N: Promise<any>
		let S: Promise<any>
		let W: Promise<any>
		let E: Promise<any>
		let NW: Promise<any>
		let SW: Promise<any>
		let NE: Promise<any>
		let SE: Promise<any>
		let NS: Promise<any>
		let EW: Promise<any>
		let NSEW: Promise<any>
		let CENTER: Promise<any>
		let NONE: Promise<any>
		let X: Promise<any>
		let Y: Promise<any>
		let BOTH: Promise<any>
		let LEFT: Promise<any>
		let TOP: Promise<any>
		let RIGHT: Promise<any>
		let BOTTOM: Promise<any>
		let RAISED: Promise<any>
		let SUNKEN: Promise<any>
		let FLAT: Promise<any>
		let RIDGE: Promise<any>
		let GROOVE: Promise<any>
		let SOLID: Promise<any>
		let HORIZONTAL: Promise<any>
		let VERTICAL: Promise<any>
		let NUMERIC: Promise<any>
		let CHAR: Promise<any>
		let WORD: Promise<any>
		let BASELINE: Promise<any>
		let INSIDE: Promise<any>
		let OUTSIDE: Promise<any>
		let SEL: Promise<any>
		let SEL_FIRST: Promise<any>
		let SEL_LAST: Promise<any>
		let END: Promise<any>
		let INSERT: Promise<any>
		let CURRENT: Promise<any>
		let ANCHOR: Promise<any>
		let ALL: Promise<any>
		let NORMAL: Promise<any>
		let DISABLED: Promise<any>
		let ACTIVE: Promise<any>
		let HIDDEN: Promise<any>
		let CASCADE: Promise<any>
		let CHECKBUTTON: Promise<any>
		let COMMAND: Promise<any>
		let RADIOBUTTON: Promise<any>
		let SEPARATOR: Promise<any>
		let SINGLE: Promise<any>
		let BROWSE: Promise<any>
		let MULTIPLE: Promise<any>
		let EXTENDED: Promise<any>
		let DOTBOX: Promise<any>
		let UNDERLINE: Promise<any>
		let PIESLICE: Promise<any>
		let CHORD: Promise<any>
		let ARC: Promise<any>
		let FIRST: Promise<any>
		let LAST: Promise<any>
		let BUTT: Promise<any>
		let PROJECTING: Promise<any>
		let ROUND: Promise<any>
		let BEVEL: Promise<any>
		let MITER: Promise<any>
		let MOVETO: Promise<any>
		let SCROLL: Promise<any>
		let UNITS: Promise<any>
		let PAGES: Promise<any>
	}
	module dialog {
		var _
		function Dialog(master?, cnf?): Promise<IDialog>
		function Dialog$({ master, cnf }: { master?, cnf?}): Promise<IDialog>
		interface IDialog {
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>
		}
		let DIALOG_ICON: Promise<any>
		let t: Promise<any>
		let q: Promise<any>
	}
	module dnd {
		var _
		function dnd_start(source, event): Promise<any>
		function dnd_start$({ source, event }): Promise<any>
		function test(): Promise<any>
		function test$($: {}): Promise<any>
		function DndHandler(source, event): Promise<IDndHandler>
		function DndHandler$({ source, event }): Promise<IDndHandler>
		interface IDndHandler {
			on_motion(event): Promise<any>
			on_motion$({ event }): Promise<any>
			on_release(event): Promise<any>
			on_release$({ event }): Promise<any>
			cancel(event?): Promise<any>
			cancel$({ event }: { event?}): Promise<any>
			finish(event, commit?): Promise<any>
			finish$({ event, commit }: { event, commit?}): Promise<any>
			root
		}
		function Icon(name): Promise<IIcon>
		function Icon$({ name }): Promise<IIcon>
		interface IIcon {
			attach(canvas, x?, y?): Promise<any>
			attach$({ canvas, x, y }: { canvas, x?, y?}): Promise<any>
			detach(): Promise<any>
			detach$($: {}): Promise<any>
			press(event): Promise<any>
			press$({ event }): Promise<any>
			move(event): Promise<any>
			move$({ event }): Promise<any>
			putback(): Promise<any>
			putback$($: {}): Promise<any>
			where(canvas, event): Promise<any>
			where$({ canvas, event }): Promise<any>
			dnd_end(target, event): Promise<any>
			dnd_end$({ target, event }): Promise<any>
		}
		function Tester(root): Promise<ITester>
		function Tester$({ root }): Promise<ITester>
		interface ITester {
			dnd_accept(source, event): Promise<any>
			dnd_accept$({ source, event }): Promise<any>
			dnd_enter(source, event): Promise<any>
			dnd_enter$({ source, event }): Promise<any>
			dnd_motion(source, event): Promise<any>
			dnd_motion$({ source, event }): Promise<any>
			dnd_leave(source, event): Promise<any>
			dnd_leave$({ source, event }): Promise<any>
			dnd_commit(source, event): Promise<any>
			dnd_commit$({ source, event }): Promise<any>
		}
	}
	module filedialog {
		var _

		/**
		 * Ask for a filename to open
		 */
		function askopenfilename(): Promise<any>
		function askopenfilename$($: {}): Promise<any>

		/**
		 * Ask for a filename to save as
		 */
		function asksaveasfilename(): Promise<any>
		function asksaveasfilename$($: {}): Promise<any>

		/**
		 * Ask for multiple filenames to open
		 * 
		 *     Returns a list of filenames or empty list if
		 *     cancel button selected
		 *     
		 */
		function askopenfilenames(): Promise<any>
		function askopenfilenames$($: {}): Promise<any>

		/**
		 * Ask for a filename to open, and returned the opened file
		 */
		function askopenfile(mode?): Promise<any>
		function askopenfile$({ mode }: { mode?}): Promise<any>

		/**
		 * Ask for multiple filenames and return the open file
		 *     objects
		 * 
		 *     returns a list of open file objects or an empty list if
		 *     cancel selected
		 *     
		 */
		function askopenfiles(mode?): Promise<any>
		function askopenfiles$({ mode }: { mode?}): Promise<any>

		/**
		 * Ask for a filename to save as, and returned the opened file
		 */
		function asksaveasfile(mode?): Promise<any>
		function asksaveasfile$({ mode }: { mode?}): Promise<any>

		/**
		 * Ask for a directory, and return the file name
		 */
		function askdirectory(): Promise<any>
		function askdirectory$($: {}): Promise<any>

		/**
		 * Simple test program.
		 */
		function test(): Promise<any>
		function test$($: {}): Promise<any>

		/**
		 * Standard file selection dialog -- no checks on selected file.
		 * 
		 *     Usage:
		 * 
		 *         d = FileDialog(master)
		 *         fname = d.go(dir_or_file, pattern, default, key)
		 *         if fname is None: ...canceled...
		 *         else: ...open file...
		 * 
		 *     All arguments to go() are optional.
		 * 
		 *     The 'key' argument specifies a key in the global dictionary
		 *     'dialogstates', which keeps track of the values for the directory
		 *     and pattern arguments, overriding the values passed in (it does
		 *     not keep track of the default argument!).  If no key is specified,
		 *     the dialog keeps no memory of previous state.  Note that memory is
		 *     kept even when the dialog is canceled.  (All this emulates the
		 *     behavior of the Macintosh file selection dialogs.)
		 * 
		 *     
		 */
		function FileDialog(master, title?): Promise<IFileDialog>
		function FileDialog$({ master, title }: { master, title?}): Promise<IFileDialog>
		interface IFileDialog {
			go(dir_or_file?, pattern?, def?, key?): Promise<any>
			go$({ dir_or_file, pattern, def, key }: { dir_or_file?, pattern?, def?, key?}): Promise<any>
			quit(how?): Promise<any>
			quit$({ how }: { how?}): Promise<any>
			dirs_double_event(event): Promise<any>
			dirs_double_event$({ event }): Promise<any>
			dirs_select_event(event): Promise<any>
			dirs_select_event$({ event }): Promise<any>
			files_double_event(event): Promise<any>
			files_double_event$({ event }): Promise<any>
			files_select_event(event): Promise<any>
			files_select_event$({ event }): Promise<any>
			ok_event(event): Promise<any>
			ok_event$({ event }): Promise<any>
			ok_command(): Promise<any>
			ok_command$($: {}): Promise<any>
			filter_command(event?): Promise<any>
			filter_command$({ event }: { event?}): Promise<any>
			get_filter(): Promise<any>
			get_filter$($: {}): Promise<any>
			get_selection(): Promise<any>
			get_selection$($: {}): Promise<any>
			cancel_command(event?): Promise<any>
			cancel_command$({ event }: { event?}): Promise<any>
			set_filter(dir, pat): Promise<any>
			set_filter$({ dir, pat }): Promise<any>
			set_selection(file): Promise<any>
			set_selection$({ file }): Promise<any>
			title
		}

		/**
		 * File selection dialog which checks that the file exists.
		 */
		interface ILoadFileDialog extends IFileDialog {
			ok_command(): Promise<any>
			ok_command$($: {}): Promise<any>
		}

		/**
		 * File selection dialog which checks that the file may be created.
		 */
		interface ISaveFileDialog extends IFileDialog {
			ok_command(): Promise<any>
			ok_command$($: {}): Promise<any>
		}
		interface I_Dialog {
		}

		/**
		 * Ask for a filename to open
		 */
		interface IOpen extends I_Dialog {
			command
		}

		/**
		 * Ask for a filename to save as
		 */
		interface ISaveAs extends I_Dialog {
		}

		/**
		 * Ask for a directory
		 */
		interface IDirectory {
		}
		let dialogstates: Promise<any>
	}
	module font {
		var _

		/**
		 * Given the name of a tk named font, returns a Font representation.
		 *     
		 */
		function nametofont(name, root?): Promise<any>
		function nametofont$({ name, root }: { name, root?}): Promise<any>

		/**
		 * Get font families (as a tuple)
		 */
		function families(root?, displayof?): Promise<any>
		function families$({ root, displayof }: { root?, displayof?}): Promise<any>

		/**
		 * Get names of defined fonts (as a tuple)
		 */
		function names(root?): Promise<any>
		function names$({ root }: { root?}): Promise<any>

		/**
		 * Represents a named font.
		 * 
		 *     Constructor options are:
		 * 
		 *     font -- font specifier (name, system font, or (family, size, style)-tuple)
		 *     name -- name to use for this font configuration (defaults to a unique name)
		 *     exists -- does a named font by this name already exist?
		 *        Creates a new named font if False, points to the existing font if True.
		 *        Raises _tkinter.TclError if the assertion is false.
		 * 
		 *        the following are ignored if font is specified:
		 * 
		 *     family -- font 'family', e.g. Courier, Times, Helvetica
		 *     size -- font size in points
		 *     weight -- font thickness: NORMAL, BOLD
		 *     slant -- font slant: ROMAN, ITALIC
		 *     underline -- font underlining: false (0), true (1)
		 *     overstrike -- font strikeout: false (0), true (1)
		 * 
		 *     
		 */
		function Font(root?, font?, name?, exists?: boolean): Promise<IFont>
		function Font$({ root, font, name, exists }: { root?, font?, name?, exists?}): Promise<IFont>
		interface IFont {

			/**
			 * Return a distinct copy of the current font
			 */
			copy(): Promise<any>
			copy$($: {}): Promise<any>

			/**
			 * Return actual font attributes
			 */
			actual(option?, displayof?): Promise<any>
			actual$({ option, displayof }: { option?, displayof?}): Promise<any>

			/**
			 * Get font attribute
			 */
			cget(option): Promise<any>
			cget$({ option }): Promise<any>

			/**
			 * Modify font attributes
			 */
			config(): Promise<any>
			config$($: {}): Promise<any>

			/**
			 * Return text width
			 */
			measure(text, displayof?): Promise<any>
			measure$({ text, displayof }: { text, displayof?}): Promise<any>

			/**
			 * Return font metrics.
			 * 
			 *         For best performance, create a dummy widget
			 *         using this font before calling this method.
			 */
			metrics(): Promise<any>
			metrics$($: {}): Promise<any>
			counter
			configure
		}
		let NORMAL: Promise<any>
		let ROMAN: Promise<any>
		let BOLD: Promise<any>
		let ITALIC: Promise<any>
		let root: Promise<any>
		let f: Promise<any>
		let w: Promise<any>
		let fb: Promise<any>
	}
	module messagebox {
		var _

		/**
		 * Show an info message
		 */
		function showinfo(title?, message?): Promise<any>
		function showinfo$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Show a warning message
		 */
		function showwarning(title?, message?): Promise<any>
		function showwarning$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Show an error message
		 */
		function showerror(title?, message?): Promise<any>
		function showerror$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Ask a question
		 */
		function askquestion(title?, message?): Promise<any>
		function askquestion$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Ask if operation should proceed; return true if the answer is ok
		 */
		function askokcancel(title?, message?): Promise<any>
		function askokcancel$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Ask a question; return true if the answer is yes
		 */
		function askyesno(title?, message?): Promise<any>
		function askyesno$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Ask a question; return true if the answer is yes, None if cancelled.
		 */
		function askyesnocancel(title?, message?): Promise<any>
		function askyesnocancel$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * Ask if operation should be retried; return true if the answer is yes
		 */
		function askretrycancel(title?, message?): Promise<any>
		function askretrycancel$({ title, message }: { title?, message?}): Promise<any>

		/**
		 * A message box
		 */
		interface IMessage {
			command
		}
		let ERROR: Promise<any>
		let INFO: Promise<any>
		let QUESTION: Promise<any>
		let WARNING: Promise<any>
		let ABORTRETRYIGNORE: Promise<any>
		let OK: Promise<any>
		let OKCANCEL: Promise<any>
		let RETRYCANCEL: Promise<any>
		let YESNO: Promise<any>
		let YESNOCANCEL: Promise<any>
		let ABORT: Promise<any>
		let RETRY: Promise<any>
		let IGNORE: Promise<any>
		let CANCEL: Promise<any>
		let YES: Promise<any>
		let NO: Promise<any>
	}
	module scrolledtext {
		var _
		function example(): Promise<any>
		function example$($: {}): Promise<any>
		function ScrolledText(master?): Promise<IScrolledText>
		function ScrolledText$({ master }: { master?}): Promise<IScrolledText>
		interface IScrolledText {
		}
	}
	module simpledialog {
		var _

		/**
		 * get an integer from the user
		 * 
		 *     Arguments:
		 * 
		 *         title -- the dialog title
		 *         prompt -- the label text
		 *         **kw -- see SimpleDialog class
		 * 
		 *     Return value is an integer
		 *     
		 */
		function askinteger(title, prompt): Promise<any>
		function askinteger$({ title, prompt }): Promise<any>

		/**
		 * get a float from the user
		 * 
		 *     Arguments:
		 * 
		 *         title -- the dialog title
		 *         prompt -- the label text
		 *         **kw -- see SimpleDialog class
		 * 
		 *     Return value is a float
		 *     
		 */
		function askfloat(title, prompt): Promise<any>
		function askfloat$({ title, prompt }): Promise<any>

		/**
		 * get a string from the user
		 * 
		 *     Arguments:
		 * 
		 *         title -- the dialog title
		 *         prompt -- the label text
		 *         **kw -- see SimpleDialog class
		 * 
		 *     Return value is a string
		 *     
		 */
		function askstring(title, prompt): Promise<any>
		function askstring$({ title, prompt }): Promise<any>
		function test(): Promise<any>
		function test$($: {}): Promise<any>
		function SimpleDialog(master, text?, buttons?, def?, cancel?, title?, class_?): Promise<ISimpleDialog>
		function SimpleDialog$({ master, text, buttons, def, cancel, title, class_ }: { master, text?, buttons?, def?, cancel?, title?, class_?}): Promise<ISimpleDialog>
		interface ISimpleDialog {
			go(): Promise<any>
			go$($: {}): Promise<any>
			return_event(event): Promise<any>
			return_event$({ event }): Promise<any>
			wm_delete_window(): Promise<any>
			wm_delete_window$($: {}): Promise<any>
			done(num): Promise<any>
			done$({ num }): Promise<any>
		}

		/**
		 * Class to open dialogs.
		 * 
		 *     This class is intended as a base class for custom dialogs
		 *     
		 */

		/**
		 * Initialize a dialog.
		 * 
		 *         Arguments:
		 * 
		 *             parent -- a parent window (the application window)
		 * 
		 *             title -- the dialog title
		 *         
		 */
		function Dialog(parent, title?): Promise<IDialog>
		function Dialog$({ parent, title }: { parent, title?}): Promise<IDialog>
		interface IDialog {

			/**
			 * Destroy the window
			 */
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>

			/**
			 * create dialog body.
			 * 
			 *         return widget that should have initial focus.
			 *         This method should be overridden, and is called
			 *         by the __init__ method.
			 *         
			 */
			body(master): Promise<any>
			body$({ master }): Promise<any>

			/**
			 * add standard button box.
			 * 
			 *         override if you do not want the standard buttons
			 *         
			 */
			buttonbox(): Promise<any>
			buttonbox$($: {}): Promise<any>
			ok(event?): Promise<any>
			ok$({ event }: { event?}): Promise<any>
			cancel(event?): Promise<any>
			cancel$({ event }: { event?}): Promise<any>

			/**
			 * validate the data
			 * 
			 *         This method is called automatically to validate the data before the
			 *         dialog is destroyed. By default, it always validates OK.
			 *         
			 */
			validate(): Promise<any>
			validate$($: {}): Promise<any>

			/**
			 * process the data
			 * 
			 *         This method is called automatically to process the data, *after*
			 *         the dialog is destroyed. By default, it does nothing.
			 *         
			 */
			apply(): Promise<any>
			apply$($: {}): Promise<any>
		}
		interface I_QueryDialog extends IDialog {
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>
			body(master): Promise<any>
			body$({ master }): Promise<any>
			validate(): Promise<any>
			validate$($: {}): Promise<any>
		}
		interface I_QueryInteger extends I_QueryDialog {
			getresult(): Promise<any>
			getresult$($: {}): Promise<any>
			errormessage
		}
		interface I_QueryFloat extends I_QueryDialog {
			getresult(): Promise<any>
			getresult$($: {}): Promise<any>
		}
		interface I_QueryString extends I_QueryDialog {
			body(master): Promise<any>
			body$({ master }): Promise<any>
			getresult(): Promise<any>
			getresult$($: {}): Promise<any>
		}
	}
	module tix {
		var _

		/**
		 * Returns the qualified path name for the widget. Normally used to set
		 *     default options for subwidgets. See tixwidgets.py
		 */
		function OptionName(widget): Promise<any>
		function OptionName$({ widget }): Promise<any>
		function FileTypeList(dict): Promise<any>
		function FileTypeList$({ dict }): Promise<any>

		/**
		 * The tix commands provide access to miscellaneous  elements
		 *     of  Tix's  internal state and the Tix application context.
		 *     Most of the information manipulated by these  commands pertains
		 *     to  the  application  as a whole, or to a screen or
		 *     display, rather than to a particular window.
		 * 
		 *     This is a mixin class, assumed to be mixed to Tkinter.Tk
		 *     that supports the self.tk.call method.
		 *     
		 */
		interface ItixCommand {

			/**
			 * Tix maintains a list of directories under which
			 *         the  tix_getimage  and tix_getbitmap commands will
			 *         search for image files. The standard bitmap  directory
			 *         is $TIX_LIBRARY/bitmaps. The addbitmapdir command
			 *         adds directory into this list. By  using  this
			 *         command, the  image  files  of an applications can
			 *         also be located using the tix_getimage or tix_getbitmap
			 *         command.
			 *         
			 */
			tix_addbitmapdir(directory): Promise<any>
			tix_addbitmapdir$({ directory }): Promise<any>

			/**
			 * Returns  the  current  value  of the configuration
			 *         option given by option. Option may be  any  of  the
			 *         options described in the CONFIGURATION OPTIONS section.
			 *         
			 */
			tix_cget(option): Promise<any>
			tix_cget$({ option }): Promise<any>

			/**
			 * Query or modify the configuration options of the Tix application
			 *         context. If no option is specified, returns a dictionary all of the
			 *         available options.  If option is specified with no value, then the
			 *         command returns a list describing the one named option (this list
			 *         will be identical to the corresponding sublist of the value
			 *         returned if no option is specified).  If one or more option-value
			 *         pairs are specified, then the command modifies the given option(s)
			 *         to have the given value(s); in this case the command returns an
			 *         empty string. Option may be any of the configuration options.
			 *         
			 */
			tix_configure(cnf?): Promise<any>
			tix_configure$({ cnf }: { cnf?}): Promise<any>

			/**
			 * Returns the file selection dialog that may be shared among
			 *         different calls from this application.  This command will create a
			 *         file selection dialog widget when it is called the first time. This
			 *         dialog will be returned by all subsequent calls to tix_filedialog.
			 *         An optional dlgclass parameter can be passed to specified what type
			 *         of file selection dialog widget is desired. Possible options are
			 *         tix FileSelectDialog or tixExFileSelectDialog.
			 *         
			 */
			tix_filedialog(dlgclass?): Promise<any>
			tix_filedialog$({ dlgclass }: { dlgclass?}): Promise<any>

			/**
			 * Locates a bitmap file of the name name.xpm or name in one of the
			 *         bitmap directories (see the tix_addbitmapdir command above).  By
			 *         using tix_getbitmap, you can avoid hard coding the pathnames of the
			 *         bitmap files in your application. When successful, it returns the
			 *         complete pathname of the bitmap file, prefixed with the character
			 *         '@'.  The returned value can be used to configure the -bitmap
			 *         option of the TK and Tix widgets.
			 *         
			 */
			tix_getbitmap(name): Promise<any>
			tix_getbitmap$({ name }): Promise<any>

			/**
			 * Locates an image file of the name name.xpm, name.xbm or name.ppm
			 *         in one of the bitmap directories (see the addbitmapdir command
			 *         above). If more than one file with the same name (but different
			 *         extensions) exist, then the image type is chosen according to the
			 *         depth of the X display: xbm images are chosen on monochrome
			 *         displays and color images are chosen on color displays. By using
			 *         tix_ getimage, you can avoid hard coding the pathnames of the
			 *         image files in your application. When successful, this command
			 *         returns the name of the newly created image, which can be used to
			 *         configure the -image option of the Tk and Tix widgets.
			 *         
			 */
			tix_getimage(name): Promise<any>
			tix_getimage$({ name }): Promise<any>

			/**
			 * Gets  the options  maintained  by  the  Tix
			 *         scheme mechanism. Available options include:
			 * 
			 *             active_bg       active_fg      bg
			 *             bold_font       dark1_bg       dark1_fg
			 *             dark2_bg        dark2_fg       disabled_fg
			 *             fg              fixed_font     font
			 *             inactive_bg     inactive_fg    input1_bg
			 *             input2_bg       italic_font    light1_bg
			 *             light1_fg       light2_bg      light2_fg
			 *             menu_font       output1_bg     output2_bg
			 *             select_bg       select_fg      selector
			 *             
			 */
			tix_option_get(name): Promise<any>
			tix_option_get$({ name }): Promise<any>

			/**
			 * Resets the scheme and fontset of the Tix application to
			 *         newScheme and newFontSet, respectively.  This affects only those
			 *         widgets created after this call. Therefore, it is best to call the
			 *         resetoptions command before the creation of any widgets in a Tix
			 *         application.
			 * 
			 *         The optional parameter newScmPrio can be given to reset the
			 *         priority level of the Tk options set by the Tix schemes.
			 * 
			 *         Because of the way Tk handles the X option database, after Tix has
			 *         been has imported and inited, it is not possible to reset the color
			 *         schemes and font sets using the tix config command.  Instead, the
			 *         tix_resetoptions command must be used.
			 *         
			 */
			tix_resetoptions(newScheme, newFontSet, newScmPrio?): Promise<any>
			tix_resetoptions$({ newScheme, newFontSet, newScmPrio }: { newScheme, newFontSet, newScmPrio?}): Promise<any>
		}

		/**
		 * Toplevel widget of Tix which represents mostly the main window
		 *     of an application. It has an associated Tcl interpreter.
		 */
		function Tk(screenName?, baseName?, className?): Promise<ITk>
		function Tk$({ screenName, baseName, className }: { screenName?, baseName?, className?}): Promise<ITk>
		interface ITk extends ItixCommand {
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>
		}

		/**
		 * The Tix Form geometry manager
		 * 
		 *     Widgets can be arranged by specifying attachments to other widgets.
		 *     See Tix documentation for complete details
		 */
		interface IForm {
			config(cnf?): Promise<any>
			config$({ cnf }: { cnf?}): Promise<any>
			check(): Promise<any>
			check$($: {}): Promise<any>
			forget(): Promise<any>
			forget$($: {}): Promise<any>
			grid(xsize?, ysize?): Promise<any>
			grid$({ xsize, ysize }: { xsize?, ysize?}): Promise<any>
			info(option?): Promise<any>
			info$({ option }: { option?}): Promise<any>
			slaves(): Promise<any>
			slaves$($: {}): Promise<any>
			form
		}

		/**
		 * A TixWidget class is used to package all (or most) Tix widgets.
		 * 
		 *     Widget initialization is extended in two ways:
		 *        1) It is possible to give a list of options which must be part of
		 *        the creation command (so called Tix 'static' options). These cannot be
		 *        given as a 'config' command later.
		 *        2) It is possible to give the name of an existing TK widget. These are
		 *        child widgets created automatically by a Tix mega-widget. The Tk call
		 *        to create these widgets is therefore bypassed in TixWidget.__init__
		 * 
		 *     Both options are for use by subclasses only.
		 *     
		 */
		function TixWidget(master?, widgetName?, static_options?, cnf?, kw?): Promise<ITixWidget>
		function TixWidget$({ master, widgetName, static_options, cnf, kw }: { master?, widgetName?, static_options?, cnf?, kw?}): Promise<ITixWidget>
		interface ITixWidget {

			/**
			 * Set a variable without calling its action routine
			 */
			set_silent(value): Promise<any>
			set_silent$({ value }): Promise<any>

			/**
			 * Return the named subwidget (which must have been created by
			 *         the sub-class).
			 */
			subwidget(name): Promise<any>
			subwidget$({ name }): Promise<any>

			/**
			 * Return all subwidgets.
			 */
			subwidgets_all(): Promise<any>
			subwidgets_all$($: {}): Promise<any>

			/**
			 * Set configuration options for all subwidgets (and self).
			 */
			config_all(option, value): Promise<any>
			config_all$({ option, value }): Promise<any>
			image_create(imgtype, cnf?, master?): Promise<any>
			image_create$({ imgtype, cnf, master }: { imgtype, cnf?, master?}): Promise<any>
			image_delete(imgname): Promise<any>
			image_delete$({ imgname }): Promise<any>
		}

		/**
		 * Subwidget class.
		 * 
		 *     This is used to mirror child widgets automatically created
		 *     by Tix/Tk as part of a mega-widget in Python (which is not informed
		 *     of this)
		 */
		function TixSubWidget(master, name, destroy_physically?, check_intermediate?): Promise<ITixSubWidget>
		function TixSubWidget$({ master, name, destroy_physically, check_intermediate }: { master, name, destroy_physically?, check_intermediate?}): Promise<ITixSubWidget>
		interface ITixSubWidget extends ITixWidget {
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>
		}

		/**
		 * DisplayStyle - handle configuration options shared by
		 *     (multiple) Display Items
		 */
		function DisplayStyle(itemtype, cnf?): Promise<IDisplayStyle>
		function DisplayStyle$({ itemtype, cnf }: { itemtype, cnf?}): Promise<IDisplayStyle>
		interface IDisplayStyle {
			delete(): Promise<any>
			delete$($: {}): Promise<any>
			config(cnf?): Promise<any>
			config$({ cnf }: { cnf?}): Promise<any>
		}

		/**
		 * Balloon help widget.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     label           Label
		 *     message         Message
		 */
		function Balloon(master?, cnf?): Promise<IBalloon>
		function Balloon$({ master, cnf }: { master?, cnf?}): Promise<IBalloon>
		interface IBalloon extends ITixWidget {

			/**
			 * Bind balloon widget to another.
			 *         One balloon widget may be bound to several widgets at the same time
			 */
			bind_widget(widget, cnf?): Promise<any>
			bind_widget$({ widget, cnf }: { widget, cnf?}): Promise<any>
			unbind_widget(widget): Promise<any>
			unbind_widget$({ widget }): Promise<any>
		}

		/**
		 * ButtonBox - A container for pushbuttons.
		 *     Subwidgets are the buttons added with the add method.
		 *     
		 */
		function ButtonBox(master?, cnf?): Promise<IButtonBox>
		function ButtonBox$({ master, cnf }: { master?, cnf?}): Promise<IButtonBox>
		interface IButtonBox extends ITixWidget {

			/**
			 * Add a button with given name to box.
			 */
			add(name, cnf?): Promise<any>
			add$({ name, cnf }: { name, cnf?}): Promise<any>
			invoke(name): Promise<any>
			invoke$({ name }): Promise<any>
		}

		/**
		 * ComboBox - an Entry field with a dropdown menu. The user can select a
		 *     choice by either typing in the entry subwidget or selecting from the
		 *     listbox subwidget.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     entry       Entry
		 *     arrow       Button
		 *     slistbox    ScrolledListBox
		 *     tick        Button
		 *     cross       Button : present if created with the fancy option
		 */
		function ComboBox(master?, cnf?): Promise<IComboBox>
		function ComboBox$({ master, cnf }: { master?, cnf?}): Promise<IComboBox>
		interface IComboBox extends ITixWidget {
			add_history(str): Promise<any>
			add_history$({ str }): Promise<any>
			append_history(str): Promise<any>
			append_history$({ str }): Promise<any>
			insert(index, str): Promise<any>
			insert$({ index, str }): Promise<any>
			pick(index): Promise<any>
			pick$({ index }): Promise<any>
		}

		/**
		 * Control - An entry field with value change arrows.  The user can
		 *     adjust the value by pressing the two arrow buttons or by entering
		 *     the value directly into the entry. The new value will be checked
		 *     against the user-defined upper and lower limits.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     incr       Button
		 *     decr       Button
		 *     entry       Entry
		 *     label       Label
		 */
		function Control(master?, cnf?): Promise<IControl>
		function Control$({ master, cnf }: { master?, cnf?}): Promise<IControl>
		interface IControl extends ITixWidget {
			decrement(): Promise<any>
			decrement$($: {}): Promise<any>
			increment(): Promise<any>
			increment$($: {}): Promise<any>
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
			update(): Promise<any>
			update$($: {}): Promise<any>
		}

		/**
		 * DirList - displays a list view of a directory, its previous
		 *     directories and its sub-directories. The user can choose one of
		 *     the directories displayed in the list or change to another directory.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     hlist       HList
		 *     hsb              Scrollbar
		 *     vsb              Scrollbar
		 */
		function DirList(master, cnf?): Promise<IDirList>
		function DirList$({ master, cnf }: { master, cnf?}): Promise<IDirList>
		interface IDirList extends ITixWidget {
			chdir(dir): Promise<any>
			chdir$({ dir }): Promise<any>
		}

		/**
		 * DirTree - Directory Listing in a hierarchical view.
		 *     Displays a tree view of a directory, its previous directories and its
		 *     sub-directories. The user can choose one of the directories displayed
		 *     in the list or change to another directory.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     hlist           HList
		 *     hsb             Scrollbar
		 *     vsb             Scrollbar
		 */
		function DirTree(master, cnf?): Promise<IDirTree>
		function DirTree$({ master, cnf }: { master, cnf?}): Promise<IDirTree>
		interface IDirTree extends ITixWidget {
			chdir(dir): Promise<any>
			chdir$({ dir }): Promise<any>
		}

		/**
		 * DirSelectBox - Motif style file select box.
		 *     It is generally used for
		 *     the user to choose a file. FileSelectBox stores the files mostly
		 *     recently selected into a ComboBox widget so that they can be quickly
		 *     selected again.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     selection       ComboBox
		 *     filter          ComboBox
		 *     dirlist         ScrolledListBox
		 *     filelist        ScrolledListBox
		 */
		function DirSelectBox(master, cnf?): Promise<IDirSelectBox>
		function DirSelectBox$({ master, cnf }: { master, cnf?}): Promise<IDirSelectBox>
		interface IDirSelectBox extends ITixWidget {
		}

		/**
		 * ExFileSelectBox - MS Windows style file select box.
		 *     It provides a convenient method for the user to select files.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     cancel       Button
		 *     ok              Button
		 *     hidden       Checkbutton
		 *     types       ComboBox
		 *     dir              ComboBox
		 *     file       ComboBox
		 *     dirlist       ScrolledListBox
		 *     filelist       ScrolledListBox
		 */
		function ExFileSelectBox(master, cnf?): Promise<IExFileSelectBox>
		function ExFileSelectBox$({ master, cnf }: { master, cnf?}): Promise<IExFileSelectBox>
		interface IExFileSelectBox extends ITixWidget {
			filter(): Promise<any>
			filter$($: {}): Promise<any>
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
		}

		/**
		 * The DirSelectDialog widget presents the directories in the file
		 *     system in a dialog window. The user can use this dialog window to
		 *     navigate through the file system to select the desired directory.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     dirbox       DirSelectDialog
		 */
		function DirSelectDialog(master, cnf?): Promise<IDirSelectDialog>
		function DirSelectDialog$({ master, cnf }: { master, cnf?}): Promise<IDirSelectDialog>
		interface IDirSelectDialog extends ITixWidget {
			popup(): Promise<any>
			popup$($: {}): Promise<any>
			popdown(): Promise<any>
			popdown$($: {}): Promise<any>
		}

		/**
		 * ExFileSelectDialog - MS Windows style file select dialog.
		 *     It provides a convenient method for the user to select files.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     fsbox       ExFileSelectBox
		 */
		function ExFileSelectDialog(master, cnf?): Promise<IExFileSelectDialog>
		function ExFileSelectDialog$({ master, cnf }: { master, cnf?}): Promise<IExFileSelectDialog>
		interface IExFileSelectDialog extends ITixWidget {
			popup(): Promise<any>
			popup$($: {}): Promise<any>
			popdown(): Promise<any>
			popdown$($: {}): Promise<any>
		}

		/**
		 * ExFileSelectBox - Motif style file select box.
		 *     It is generally used for
		 *     the user to choose a file. FileSelectBox stores the files mostly
		 *     recently selected into a ComboBox widget so that they can be quickly
		 *     selected again.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     selection       ComboBox
		 *     filter          ComboBox
		 *     dirlist         ScrolledListBox
		 *     filelist        ScrolledListBox
		 */
		function FileSelectBox(master, cnf?): Promise<IFileSelectBox>
		function FileSelectBox$({ master, cnf }: { master, cnf?}): Promise<IFileSelectBox>
		interface IFileSelectBox extends ITixWidget {
			apply_filter(): Promise<any>
			apply_filter$($: {}): Promise<any>
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
		}

		/**
		 * FileSelectDialog - Motif style file select dialog.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     btns       StdButtonBox
		 *     fsbox       FileSelectBox
		 */
		function FileSelectDialog(master, cnf?): Promise<IFileSelectDialog>
		function FileSelectDialog$({ master, cnf }: { master, cnf?}): Promise<IFileSelectDialog>
		interface IFileSelectDialog extends ITixWidget {
			popup(): Promise<any>
			popup$($: {}): Promise<any>
			popdown(): Promise<any>
			popdown$($: {}): Promise<any>
		}

		/**
		 * FileEntry - Entry field with button that invokes a FileSelectDialog.
		 *     The user can type in the filename manually. Alternatively, the user can
		 *     press the button widget that sits next to the entry, which will bring
		 *     up a file selection dialog.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     button       Button
		 *     entry       Entry
		 */
		function FileEntry(master, cnf?): Promise<IFileEntry>
		function FileEntry$({ master, cnf }: { master, cnf?}): Promise<IFileEntry>
		interface IFileEntry extends ITixWidget {
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
			file_dialog(): Promise<any>
			file_dialog$($: {}): Promise<any>
		}

		/**
		 * HList - Hierarchy display  widget can be used to display any data
		 *     that have a hierarchical structure, for example, file system directory
		 *     trees. The list entries are indented and connected by branch lines
		 *     according to their places in the hierarchy.
		 * 
		 *     Subwidgets - None
		 */
		function HList(master?, cnf?): Promise<IHList>
		function HList$({ master, cnf }: { master?, cnf?}): Promise<IHList>
		interface IHList extends ITixWidget {
			add(entry, cnf?): Promise<any>
			add$({ entry, cnf }: { entry, cnf?}): Promise<any>
			add_child(parent?, cnf?): Promise<any>
			add_child$({ parent, cnf }: { parent?, cnf?}): Promise<any>
			anchor_set(entry): Promise<any>
			anchor_set$({ entry }): Promise<any>
			anchor_clear(): Promise<any>
			anchor_clear$($: {}): Promise<any>
			column_width(col?, width?, chars?): Promise<any>
			column_width$({ col, width, chars }: { col?, width?, chars?}): Promise<any>
			delete_all(): Promise<any>
			delete_all$($: {}): Promise<any>
			delete_entry(entry): Promise<any>
			delete_entry$({ entry }): Promise<any>
			delete_offsprings(entry): Promise<any>
			delete_offsprings$({ entry }): Promise<any>
			delete_siblings(entry): Promise<any>
			delete_siblings$({ entry }): Promise<any>
			dragsite_set(index): Promise<any>
			dragsite_set$({ index }): Promise<any>
			dragsite_clear(): Promise<any>
			dragsite_clear$($: {}): Promise<any>
			dropsite_set(index): Promise<any>
			dropsite_set$({ index }): Promise<any>
			dropsite_clear(): Promise<any>
			dropsite_clear$($: {}): Promise<any>
			header_create(col, cnf?): Promise<any>
			header_create$({ col, cnf }: { col, cnf?}): Promise<any>
			header_configure(col, cnf?): Promise<any>
			header_configure$({ col, cnf }: { col, cnf?}): Promise<any>
			header_cget(col, opt): Promise<any>
			header_cget$({ col, opt }): Promise<any>
			header_exists(col): Promise<any>
			header_exists$({ col }): Promise<any>
			header_delete(col): Promise<any>
			header_delete$({ col }): Promise<any>
			header_size(col): Promise<any>
			header_size$({ col }): Promise<any>
			hide_entry(entry): Promise<any>
			hide_entry$({ entry }): Promise<any>
			indicator_create(entry, cnf?): Promise<any>
			indicator_create$({ entry, cnf }: { entry, cnf?}): Promise<any>
			indicator_configure(entry, cnf?): Promise<any>
			indicator_configure$({ entry, cnf }: { entry, cnf?}): Promise<any>
			indicator_cget(entry, opt): Promise<any>
			indicator_cget$({ entry, opt }): Promise<any>
			indicator_exists(entry): Promise<any>
			indicator_exists$({ entry }): Promise<any>
			indicator_delete(entry): Promise<any>
			indicator_delete$({ entry }): Promise<any>
			indicator_size(entry): Promise<any>
			indicator_size$({ entry }): Promise<any>
			info_anchor(): Promise<any>
			info_anchor$($: {}): Promise<any>
			info_bbox(entry): Promise<any>
			info_bbox$({ entry }): Promise<any>
			info_children(entry?): Promise<any>
			info_children$({ entry }: { entry?}): Promise<any>
			info_data(entry): Promise<any>
			info_data$({ entry }): Promise<any>
			info_dragsite(): Promise<any>
			info_dragsite$($: {}): Promise<any>
			info_dropsite(): Promise<any>
			info_dropsite$($: {}): Promise<any>
			info_exists(entry): Promise<any>
			info_exists$({ entry }): Promise<any>
			info_hidden(entry): Promise<any>
			info_hidden$({ entry }): Promise<any>
			info_next(entry): Promise<any>
			info_next$({ entry }): Promise<any>
			info_parent(entry): Promise<any>
			info_parent$({ entry }): Promise<any>
			info_prev(entry): Promise<any>
			info_prev$({ entry }): Promise<any>
			info_selection(): Promise<any>
			info_selection$($: {}): Promise<any>
			item_cget(entry, col, opt): Promise<any>
			item_cget$({ entry, col, opt }): Promise<any>
			item_configure(entry, col, cnf?): Promise<any>
			item_configure$({ entry, col, cnf }: { entry, col, cnf?}): Promise<any>
			item_create(entry, col, cnf?): Promise<any>
			item_create$({ entry, col, cnf }: { entry, col, cnf?}): Promise<any>
			item_exists(entry, col): Promise<any>
			item_exists$({ entry, col }): Promise<any>
			item_delete(entry, col): Promise<any>
			item_delete$({ entry, col }): Promise<any>
			entrycget(entry, opt): Promise<any>
			entrycget$({ entry, opt }): Promise<any>
			entryconfigure(entry, cnf?): Promise<any>
			entryconfigure$({ entry, cnf }: { entry, cnf?}): Promise<any>
			nearest(y): Promise<any>
			nearest$({ y }): Promise<any>
			see(entry): Promise<any>
			see$({ entry }): Promise<any>
			selection_clear(cnf?): Promise<any>
			selection_clear$({ cnf }: { cnf?}): Promise<any>
			selection_includes(entry): Promise<any>
			selection_includes$({ entry }): Promise<any>
			selection_set(first, last?): Promise<any>
			selection_set$({ first, last }: { first, last?}): Promise<any>
			show_entry(entry): Promise<any>
			show_entry$({ entry }): Promise<any>
			header_exist
		}

		/**
		 * InputOnly - Invisible widget. Unix only.
		 * 
		 *     Subwidgets - None
		 */
		function InputOnly(master?, cnf?): Promise<IInputOnly>
		function InputOnly$({ master, cnf }: { master?, cnf?}): Promise<IInputOnly>
		interface IInputOnly extends ITixWidget {
		}

		/**
		 * LabelEntry - Entry field with label. Packages an entry widget
		 *     and a label into one mega widget. It can be used to simplify the creation
		 *     of ``entry-form'' type of interface.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     label       Label
		 *     entry       Entry
		 */
		function LabelEntry(master?, cnf?): Promise<ILabelEntry>
		function LabelEntry$({ master, cnf }: { master?, cnf?}): Promise<ILabelEntry>
		interface ILabelEntry extends ITixWidget {
		}

		/**
		 * LabelFrame - Labelled Frame container. Packages a frame widget
		 *     and a label into one mega widget. To create widgets inside a
		 *     LabelFrame widget, one creates the new widgets relative to the
		 *     frame subwidget and manage them inside the frame subwidget.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     label       Label
		 *     frame       Frame
		 */
		function LabelFrame(master?, cnf?): Promise<ILabelFrame>
		function LabelFrame$({ master, cnf }: { master?, cnf?}): Promise<ILabelFrame>
		interface ILabelFrame extends ITixWidget {
		}

		/**
		 * A ListNoteBook widget is very similar to the TixNoteBook widget:
		 *     it can be used to display many windows in a limited space using a
		 *     notebook metaphor. The notebook is divided into a stack of pages
		 *     (windows). At one time only one of these pages can be shown.
		 *     The user can navigate through these pages by
		 *     choosing the name of the desired page in the hlist subwidget.
		 */
		function ListNoteBook(master, cnf?): Promise<IListNoteBook>
		function ListNoteBook$({ master, cnf }: { master, cnf?}): Promise<IListNoteBook>
		interface IListNoteBook extends ITixWidget {
			add(name, cnf?): Promise<any>
			add$({ name, cnf }: { name, cnf?}): Promise<any>
			page(name): Promise<any>
			page$({ name }): Promise<any>
			pages(): Promise<any>
			pages$($: {}): Promise<any>
			raise_page(name): Promise<any>
			raise_page$({ name }): Promise<any>
		}

		/**
		 * The Meter widget can be used to show the progress of a background
		 *     job which may take a long time to execute.
		 *     
		 */
		function Meter(master?, cnf?): Promise<IMeter>
		function Meter$({ master, cnf }: { master?, cnf?}): Promise<IMeter>
		interface IMeter extends ITixWidget {
		}

		/**
		 * NoteBook - Multi-page container widget (tabbed notebook metaphor).
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     nbframe       NoteBookFrame
		 *     <pages>       page widgets added dynamically with the add method
		 */
		function NoteBook(master?, cnf?): Promise<INoteBook>
		function NoteBook$({ master, cnf }: { master?, cnf?}): Promise<INoteBook>
		interface INoteBook extends ITixWidget {
			add(name, cnf?): Promise<any>
			add$({ name, cnf }: { name, cnf?}): Promise<any>
			delete(name): Promise<any>
			delete$({ name }): Promise<any>
			page(name): Promise<any>
			page$({ name }): Promise<any>
			pages(): Promise<any>
			pages$($: {}): Promise<any>
			raise_page(name): Promise<any>
			raise_page$({ name }): Promise<any>
			raised(): Promise<any>
			raised$($: {}): Promise<any>
		}
		interface INoteBookFrame extends ITixWidget {
		}

		/**
		 * OptionMenu - creates a menu button of options.
		 * 
		 *     Subwidget       Class
		 *     ---------       -----
		 *     menubutton      Menubutton
		 *     menu            Menu
		 */
		function OptionMenu(master, cnf?): Promise<IOptionMenu>
		function OptionMenu$({ master, cnf }: { master, cnf?}): Promise<IOptionMenu>
		interface IOptionMenu extends ITixWidget {
			add_command(name, cnf?): Promise<any>
			add_command$({ name, cnf }: { name, cnf?}): Promise<any>
			add_separator(name, cnf?): Promise<any>
			add_separator$({ name, cnf }: { name, cnf?}): Promise<any>
			delete(name): Promise<any>
			delete$({ name }): Promise<any>
			disable(name): Promise<any>
			disable$({ name }): Promise<any>
			enable(name): Promise<any>
			enable$({ name }): Promise<any>
		}

		/**
		 * PanedWindow - Multi-pane container widget
		 *     allows the user to interactively manipulate the sizes of several
		 *     panes. The panes can be arranged either vertically or horizontally.The
		 *     user changes the sizes of the panes by dragging the resize handle
		 *     between two panes.
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     <panes>       g/p widgets added dynamically with the add method.
		 */
		function PanedWindow(master, cnf?): Promise<IPanedWindow>
		function PanedWindow$({ master, cnf }: { master, cnf?}): Promise<IPanedWindow>
		interface IPanedWindow extends ITixWidget {
			add(name, cnf?): Promise<any>
			add$({ name, cnf }: { name, cnf?}): Promise<any>
			delete(name): Promise<any>
			delete$({ name }): Promise<any>
			forget(name): Promise<any>
			forget$({ name }): Promise<any>
			panecget(entry, opt): Promise<any>
			panecget$({ entry, opt }): Promise<any>
			paneconfigure(entry, cnf?): Promise<any>
			paneconfigure$({ entry, cnf }: { entry, cnf?}): Promise<any>
			panes(): Promise<any>
			panes$($: {}): Promise<any>
		}

		/**
		 * PopupMenu widget can be used as a replacement of the tk_popup command.
		 *     The advantage of the Tix PopupMenu widget is it requires less application
		 *     code to manipulate.
		 * 
		 * 
		 *     Subwidgets       Class
		 *     ----------       -----
		 *     menubutton       Menubutton
		 *     menu       Menu
		 */
		function PopupMenu(master, cnf?): Promise<IPopupMenu>
		function PopupMenu$({ master, cnf }: { master, cnf?}): Promise<IPopupMenu>
		interface IPopupMenu extends ITixWidget {
			bind_widget(widget): Promise<any>
			bind_widget$({ widget }): Promise<any>
			unbind_widget(widget): Promise<any>
			unbind_widget$({ widget }): Promise<any>
			post_widget(widget, x, y): Promise<any>
			post_widget$({ widget, x, y }): Promise<any>
		}

		/**
		 * Internal widget to draw resize handles on Scrolled widgets.
		 */
		function ResizeHandle(master, cnf?): Promise<IResizeHandle>
		function ResizeHandle$({ master, cnf }: { master, cnf?}): Promise<IResizeHandle>
		interface IResizeHandle extends ITixWidget {
			attach_widget(widget): Promise<any>
			attach_widget$({ widget }): Promise<any>
			detach_widget(widget): Promise<any>
			detach_widget$({ widget }): Promise<any>
			hide(widget): Promise<any>
			hide$({ widget }): Promise<any>
			show(widget): Promise<any>
			show$({ widget }): Promise<any>
		}

		/**
		 * ScrolledHList - HList with automatic scrollbars.
		 */
		function ScrolledHList(master, cnf?): Promise<IScrolledHList>
		function ScrolledHList$({ master, cnf }: { master, cnf?}): Promise<IScrolledHList>
		interface IScrolledHList extends ITixWidget {
		}

		/**
		 * ScrolledListBox - Listbox with automatic scrollbars.
		 */
		function ScrolledListBox(master, cnf?): Promise<IScrolledListBox>
		function ScrolledListBox$({ master, cnf }: { master, cnf?}): Promise<IScrolledListBox>
		interface IScrolledListBox extends ITixWidget {
		}

		/**
		 * ScrolledText - Text with automatic scrollbars.
		 */
		function ScrolledText(master, cnf?): Promise<IScrolledText>
		function ScrolledText$({ master, cnf }: { master, cnf?}): Promise<IScrolledText>
		interface IScrolledText extends ITixWidget {
		}

		/**
		 * ScrolledTList - TList with automatic scrollbars.
		 */
		function ScrolledTList(master, cnf?): Promise<IScrolledTList>
		function ScrolledTList$({ master, cnf }: { master, cnf?}): Promise<IScrolledTList>
		interface IScrolledTList extends ITixWidget {
		}

		/**
		 * ScrolledWindow - Window with automatic scrollbars.
		 */
		function ScrolledWindow(master, cnf?): Promise<IScrolledWindow>
		function ScrolledWindow$({ master, cnf }: { master, cnf?}): Promise<IScrolledWindow>
		interface IScrolledWindow extends ITixWidget {
		}

		/**
		 * Select - Container of button subwidgets. It can be used to provide
		 *     radio-box or check-box style of selection options for the user.
		 * 
		 *     Subwidgets are buttons added dynamically using the add method.
		 */
		function Select(master, cnf?): Promise<ISelect>
		function Select$({ master, cnf }: { master, cnf?}): Promise<ISelect>
		interface ISelect extends ITixWidget {
			add(name, cnf?): Promise<any>
			add$({ name, cnf }: { name, cnf?}): Promise<any>
			invoke(name): Promise<any>
			invoke$({ name }): Promise<any>
		}

		/**
		 * Toplevel window.
		 * 
		 *     Subwidgets - None
		 */
		function Shell(master?, cnf?): Promise<IShell>
		function Shell$({ master, cnf }: { master?, cnf?}): Promise<IShell>
		interface IShell extends ITixWidget {
		}

		/**
		 * Toplevel window, with popup popdown and center methods.
		 *     It tells the window manager that it is a dialog window and should be
		 *     treated specially. The exact treatment depends on the treatment of
		 *     the window manager.
		 * 
		 *     Subwidgets - None
		 */
		function DialogShell(master?, cnf?): Promise<IDialogShell>
		function DialogShell$({ master, cnf }: { master?, cnf?}): Promise<IDialogShell>
		interface IDialogShell extends ITixWidget {
			popdown(): Promise<any>
			popdown$($: {}): Promise<any>
			popup(): Promise<any>
			popup$($: {}): Promise<any>
			center(): Promise<any>
			center$($: {}): Promise<any>
		}

		/**
		 * StdButtonBox - Standard Button Box (OK, Apply, Cancel and Help) 
		 */
		function StdButtonBox(master?, cnf?): Promise<IStdButtonBox>
		function StdButtonBox$({ master, cnf }: { master?, cnf?}): Promise<IStdButtonBox>
		interface IStdButtonBox extends ITixWidget {
			invoke(name): Promise<any>
			invoke$({ name }): Promise<any>
		}

		/**
		 * TList - Hierarchy display widget which can be
		 *     used to display data in a tabular format. The list entries of a TList
		 *     widget are similar to the entries in the Tk listbox widget. The main
		 *     differences are (1) the TList widget can display the list entries in a
		 *     two dimensional format and (2) you can use graphical images as well as
		 *     multiple colors and fonts for the list entries.
		 * 
		 *     Subwidgets - None
		 */
		function TList(master?, cnf?): Promise<ITList>
		function TList$({ master, cnf }: { master?, cnf?}): Promise<ITList>
		interface ITList extends ITixWidget {
			active_set(index): Promise<any>
			active_set$({ index }): Promise<any>
			active_clear(): Promise<any>
			active_clear$($: {}): Promise<any>
			anchor_set(index): Promise<any>
			anchor_set$({ index }): Promise<any>
			anchor_clear(): Promise<any>
			anchor_clear$($: {}): Promise<any>
			delete(from_, to?): Promise<any>
			delete$({ from_, to }: { from_, to?}): Promise<any>
			dragsite_set(index): Promise<any>
			dragsite_set$({ index }): Promise<any>
			dragsite_clear(): Promise<any>
			dragsite_clear$($: {}): Promise<any>
			dropsite_set(index): Promise<any>
			dropsite_set$({ index }): Promise<any>
			dropsite_clear(): Promise<any>
			dropsite_clear$($: {}): Promise<any>
			insert(index, cnf?): Promise<any>
			insert$({ index, cnf }: { index, cnf?}): Promise<any>
			info_active(): Promise<any>
			info_active$($: {}): Promise<any>
			info_anchor(): Promise<any>
			info_anchor$($: {}): Promise<any>
			info_down(index): Promise<any>
			info_down$({ index }): Promise<any>
			info_left(index): Promise<any>
			info_left$({ index }): Promise<any>
			info_right(index): Promise<any>
			info_right$({ index }): Promise<any>
			info_selection(): Promise<any>
			info_selection$($: {}): Promise<any>
			info_size(): Promise<any>
			info_size$($: {}): Promise<any>
			info_up(index): Promise<any>
			info_up$({ index }): Promise<any>
			nearest(x, y): Promise<any>
			nearest$({ x, y }): Promise<any>
			see(index): Promise<any>
			see$({ index }): Promise<any>
			selection_clear(cnf?): Promise<any>
			selection_clear$({ cnf }: { cnf?}): Promise<any>
			selection_includes(index): Promise<any>
			selection_includes$({ index }): Promise<any>
			selection_set(first, last?): Promise<any>
			selection_set$({ first, last }: { first, last?}): Promise<any>
		}

		/**
		 * Tree - The tixTree widget can be used to display hierarchical
		 *     data in a tree form. The user can adjust
		 *     the view of the tree by opening or closing parts of the tree.
		 */
		function Tree(master?, cnf?): Promise<ITree>
		function Tree$({ master, cnf }: { master?, cnf?}): Promise<ITree>
		interface ITree extends ITixWidget {

			/**
			 * This command calls the setmode method for all the entries in this
			 *      Tree widget: if an entry has no child entries, its mode is set to
			 *      none. Otherwise, if the entry has any hidden child entries, its mode is
			 *      set to open; otherwise its mode is set to close.
			 */
			autosetmode(): Promise<any>
			autosetmode$($: {}): Promise<any>

			/**
			 * Close the entry given by entryPath if its mode is close.
			 */
			close(entrypath): Promise<any>
			close$({ entrypath }): Promise<any>

			/**
			 * Returns the current mode of the entry given by entryPath.
			 */
			getmode(entrypath): Promise<any>
			getmode$({ entrypath }): Promise<any>

			/**
			 * Open the entry given by entryPath if its mode is open.
			 */
			open(entrypath): Promise<any>
			open$({ entrypath }): Promise<any>

			/**
			 * This command is used to indicate whether the entry given by
			 *      entryPath has children entries and whether the children are visible. mode
			 *      must be one of open, close or none. If mode is set to open, a (+)
			 *      indicator is drawn next the entry. If mode is set to close, a (-)
			 *      indicator is drawn next the entry. If mode is set to none, no
			 *      indicators will be drawn for this entry. The default mode is none. The
			 *      open mode indicates the entry has hidden children and this entry can be
			 *      opened by the user. The close mode indicates that all the children of the
			 *      entry are now visible and the entry can be closed by the user.
			 */
			setmode(entrypath, mode?): Promise<any>
			setmode$({ entrypath, mode }: { entrypath, mode?}): Promise<any>
		}

		/**
		 * The CheckList widget
		 *     displays a list of items to be selected by the user. CheckList acts
		 *     similarly to the Tk checkbutton or radiobutton widgets, except it is
		 *     capable of handling many more items than checkbuttons or radiobuttons.
		 *     
		 */
		function CheckList(master?, cnf?): Promise<ICheckList>
		function CheckList$({ master, cnf }: { master?, cnf?}): Promise<ICheckList>
		interface ICheckList extends ITixWidget {

			/**
			 * This command calls the setmode method for all the entries in this
			 *      Tree widget: if an entry has no child entries, its mode is set to
			 *      none. Otherwise, if the entry has any hidden child entries, its mode is
			 *      set to open; otherwise its mode is set to close.
			 */
			autosetmode(): Promise<any>
			autosetmode$($: {}): Promise<any>

			/**
			 * Close the entry given by entryPath if its mode is close.
			 */
			close(entrypath): Promise<any>
			close$({ entrypath }): Promise<any>

			/**
			 * Returns the current mode of the entry given by entryPath.
			 */
			getmode(entrypath): Promise<any>
			getmode$({ entrypath }): Promise<any>

			/**
			 * Open the entry given by entryPath if its mode is open.
			 */
			open(entrypath): Promise<any>
			open$({ entrypath }): Promise<any>

			/**
			 * Returns a list of items whose status matches status. If status is
			 *      not specified, the list of items in the "on" status will be returned.
			 *      Mode can be on, off, default
			 */
			getselection(mode?): Promise<any>
			getselection$({ mode }: { mode?}): Promise<any>

			/**
			 * Returns the current status of entryPath.
			 */
			getstatus(entrypath): Promise<any>
			getstatus$({ entrypath }): Promise<any>

			/**
			 * Sets the status of entryPath to be status. A bitmap will be
			 *      displayed next to the entry its status is on, off or default.
			 */
			setstatus(entrypath, mode?): Promise<any>
			setstatus$({ entrypath, mode }: { entrypath, mode?}): Promise<any>
		}
		interface I_dummyButton extends ITixSubWidget {
		}
		interface I_dummyCheckbutton extends ITixSubWidget {
		}
		interface I_dummyEntry extends ITixSubWidget {
		}
		interface I_dummyFrame extends ITixSubWidget {
		}
		interface I_dummyLabel extends ITixSubWidget {
		}
		interface I_dummyListbox extends ITixSubWidget {
		}
		interface I_dummyMenu extends ITixSubWidget {
		}
		interface I_dummyMenubutton extends ITixSubWidget {
		}
		interface I_dummyScrollbar extends ITixSubWidget {
		}
		interface I_dummyText extends ITixSubWidget {
		}
		interface I_dummyScrolledListBox extends IScrolledListBox, ITixSubWidget {
		}
		interface I_dummyHList extends IHList, ITixSubWidget {
		}
		interface I_dummyScrolledHList extends IScrolledHList, ITixSubWidget {
		}
		interface I_dummyTList extends ITList, ITixSubWidget {
		}
		interface I_dummyComboBox extends IComboBox, ITixSubWidget {
		}
		interface I_dummyDirList extends IDirList, ITixSubWidget {
		}
		interface I_dummyDirSelectBox extends IDirSelectBox, ITixSubWidget {
		}
		interface I_dummyExFileSelectBox extends IExFileSelectBox, ITixSubWidget {
		}
		interface I_dummyFileSelectBox extends IFileSelectBox, ITixSubWidget {
		}
		interface I_dummyFileComboBox extends IComboBox, ITixSubWidget {
		}
		interface I_dummyStdButtonBox extends IStdButtonBox, ITixSubWidget {
		}
		interface I_dummyNoteBookFrame extends INoteBookFrame, ITixSubWidget {
		}
		interface I_dummyPanedWindow extends IPanedWindow, ITixSubWidget {
		}

		/**
		 * This file implements the Canvas Object View widget. This is a base
		 *     class of IconView. It implements automatic placement/adjustment of the
		 *     scrollbars according to the canvas objects inside the canvas subwidget.
		 *     The scrollbars are adjusted so that the canvas is just large enough
		 *     to see all the objects.
		 *     
		 */
		interface ICObjView extends ITixWidget {
		}

		/**
		 * The Tix Grid command creates a new window  and makes it into a
		 *     tixGrid widget. Additional options, may be specified on the command
		 *     line or in the option database to configure aspects such as its cursor
		 *     and relief.
		 * 
		 *     A Grid widget displays its contents in a two dimensional grid of cells.
		 *     Each cell may contain one Tix display item, which may be in text,
		 *     graphics or other formats. See the DisplayStyle class for more information
		 *     about Tix display items. Individual cells, or groups of cells, can be
		 *     formatted with a wide range of attributes, such as its color, relief and
		 *     border.
		 * 
		 *     Subwidgets - None
		 */
		function Grid(master?, cnf?): Promise<IGrid>
		function Grid$({ master, cnf }: { master?, cnf?}): Promise<IGrid>
		interface IGrid extends ITixWidget {

			/**
			 * Removes the selection anchor.
			 */
			anchor_clear(): Promise<any>
			anchor_clear$($: {}): Promise<any>

			/**
			 * Get the (x,y) coordinate of the current anchor cell
			 */
			anchor_get(): Promise<any>
			anchor_get$($: {}): Promise<any>

			/**
			 * Set the selection anchor to the cell at (x, y).
			 */
			anchor_set(x, y): Promise<any>
			anchor_set$({ x, y }): Promise<any>

			/**
			 * Delete rows between from_ and to inclusive.
			 *         If to is not provided,  delete only row at from_
			 */
			delete_row(from_, to?): Promise<any>
			delete_row$({ from_, to }: { from_, to?}): Promise<any>

			/**
			 * Delete columns between from_ and to inclusive.
			 *         If to is not provided,  delete only column at from_
			 */
			delete_column(from_, to?): Promise<any>
			delete_column$({ from_, to }: { from_, to?}): Promise<any>

			/**
			 * If any cell is being edited, de-highlight the cell  and  applies
			 *         the changes.
			 */
			edit_apply(): Promise<any>
			edit_apply$($: {}): Promise<any>

			/**
			 * Highlights  the  cell  at  (x, y) for editing, if the -editnotify
			 *         command returns True for this cell.
			 */
			edit_set(x, y): Promise<any>
			edit_set$({ x, y }): Promise<any>

			/**
			 * Get the option value for cell at (x,y)
			 */
			entrycget(x, y, option): Promise<any>
			entrycget$({ x, y, option }): Promise<any>
			entryconfigure(x, y, cnf?): Promise<any>
			entryconfigure$({ x, y, cnf }: { x, y, cnf?}): Promise<any>

			/**
			 * Return True if display item exists at (x,y)
			 */
			info_exists(x, y): Promise<any>
			info_exists$({ x, y }): Promise<any>
			info_bbox(x, y): Promise<any>
			info_bbox$({ x, y }): Promise<any>

			/**
			 * Moves the range of columns from position FROM through TO by
			 *         the distance indicated by OFFSET. For example, move_column(2, 4, 1)
			 *         moves the columns 2,3,4 to columns 3,4,5.
			 */
			move_column(from_, to, offset): Promise<any>
			move_column$({ from_, to, offset }): Promise<any>

			/**
			 * Moves the range of rows from position FROM through TO by
			 *         the distance indicated by OFFSET.
			 *         For example, move_row(2, 4, 1) moves the rows 2,3,4 to rows 3,4,5.
			 */
			move_row(from_, to, offset): Promise<any>
			move_row$({ from_, to, offset }): Promise<any>

			/**
			 * Return coordinate of cell nearest pixel coordinate (x,y)
			 */
			nearest(x, y): Promise<any>
			nearest$({ x, y }): Promise<any>
			set(x, y, itemtype?): Promise<any>
			set$({ x, y, itemtype }: { x, y, itemtype?}): Promise<any>

			/**
			 * Queries or sets the size of the column given by
			 *         INDEX.  INDEX may be any non-negative
			 *         integer that gives the position of a given column.
			 *         INDEX can also be the string "default"; in this case, this command
			 *         queries or sets the default size of all columns.
			 *         When no option-value pair is given, this command returns a tuple
			 *         containing the current size setting of the given column.  When
			 *         option-value pairs are given, the corresponding options of the
			 *         size setting of the given column are changed. Options may be one
			 *         of the following:
			 *               pad0 pixels
			 *                      Specifies the paddings to the left of a column.
			 *               pad1 pixels
			 *                      Specifies the paddings to the right of a column.
			 *               size val
			 *                      Specifies the width of a column.  Val may be:
			 *                      "auto" -- the width of the column is set to the
			 *                      width of the widest cell in the column;
			 *                      a valid Tk screen distance unit;
			 *                      or a real number following by the word chars
			 *                      (e.g. 3.4chars) that sets the width of the column to the
			 *                      given number of characters.
			 */
			size_column(index): Promise<any>
			size_column$({ index }): Promise<any>

			/**
			 * Queries or sets the size of the row given by
			 *         INDEX. INDEX may be any non-negative
			 *         integer that gives the position of a given row .
			 *         INDEX can also be the string "default"; in this case, this command
			 *         queries or sets the default size of all rows.
			 *         When no option-value pair is given, this command returns a list con-
			 *         taining the current size setting of the given row . When option-value
			 *         pairs are given, the corresponding options of the size setting of the
			 *         given row are changed. Options may be one of the following:
			 *               pad0 pixels
			 *                      Specifies the paddings to the top of a row.
			 *               pad1 pixels
			 *                      Specifies the paddings to the bottom of a row.
			 *               size val
			 *                      Specifies the height of a row.  Val may be:
			 *                      "auto" -- the height of the row is set to the
			 *                      height of the highest cell in the row;
			 *                      a valid Tk screen distance unit;
			 *                      or a real number following by the word chars
			 *                      (e.g. 3.4chars) that sets the height of the row to the
			 *                      given number of characters.
			 */
			size_row(index): Promise<any>
			size_row$({ index }): Promise<any>

			/**
			 * Clears the cell at (x, y) by removing its display item.
			 */
			unset(x, y): Promise<any>
			unset$({ x, y }): Promise<any>
		}

		/**
		 * Scrolled Grid widgets
		 */
		function ScrolledGrid(master?, cnf?): Promise<IScrolledGrid>
		function ScrolledGrid$({ master, cnf }: { master?, cnf?}): Promise<IScrolledGrid>
		interface IScrolledGrid extends IGrid {
		}
		let WINDOW: Promise<any>
		let TEXT: Promise<any>
		let STATUS: Promise<any>
		let IMMEDIATE: Promise<any>
		let IMAGE: Promise<any>
		let IMAGETEXT: Promise<any>
		let BALLOON: Promise<any>
		let AUTO: Promise<any>
		let ACROSSTOP: Promise<any>
		let ASCII: Promise<any>
		let CELL: Promise<any>
		let COLUMN: Promise<any>
		let DECREASING: Promise<any>
		let INCREASING: Promise<any>
		let INTEGER: Promise<any>
		let MAIN: Promise<any>
		let MAX: Promise<any>
		let REAL: Promise<any>
		let ROW: Promise<any>
		let S_REGION: Promise<any>
		let X_REGION: Promise<any>
		let Y_REGION: Promise<any>
		let TCL_DONT_WAIT: Promise<any>
		let TCL_WINDOW_EVENTS: Promise<any>
		let TCL_FILE_EVENTS: Promise<any>
		let TCL_TIMER_EVENTS: Promise<any>
		let TCL_IDLE_EVENTS: Promise<any>
		let TCL_ALL_EVENTS: Promise<any>
	}
	module ttk {
		var _

		/**
		 * Returns adict with its values converted from Tcl objects to Python
		 *     objects.
		 */
		function tclobjs_to_py(adict): Promise<any>
		function tclobjs_to_py$({ adict }): Promise<any>

		/**
		 * If master is not None, itself is returned. If master is None,
		 *     the default master is returned if there is one, otherwise a new
		 *     master is created and returned.
		 * 
		 *     If it is not allowed to use the default root and master is None,
		 *     RuntimeError is raised.
		 */
		function setup_master(master?): Promise<any>
		function setup_master$({ master }: { master?}): Promise<any>

		/**
		 * Manipulate style database.
		 */
		function Style(master?): Promise<IStyle>
		function Style$({ master }: { master?}): Promise<IStyle>
		interface IStyle {

			/**
			 * Query or sets the default value of the specified option(s) in
			 *         style.
			 * 
			 *         Each key in kw is an option and each value is either a string or
			 *         a sequence identifying the value for that option.
			 */
			configure(style, query_opt?): Promise<any>
			configure$({ style, query_opt }: { style, query_opt?}): Promise<any>

			/**
			 * Query or sets dynamic values of the specified option(s) in
			 *         style.
			 * 
			 *         Each key in kw is an option and each value should be a list or a
			 *         tuple (usually) containing statespecs grouped in tuples, or list,
			 *         or something else of your preference. A statespec is compound of
			 *         one or more states and then a value.
			 */
			map(style, query_opt?): Promise<any>
			map$({ style, query_opt }: { style, query_opt?}): Promise<any>

			/**
			 * Returns the value specified for option in style.
			 * 
			 *         If state is specified it is expected to be a sequence of one
			 *         or more states. If the default argument is set, it is used as
			 *         a fallback value in case no specification for option is found.
			 */
			lookup(style, option, state?, def?): Promise<any>
			lookup$({ style, option, state, def }: { style, option, state?, def?}): Promise<any>

			/**
			 * Define the widget layout for given style. If layoutspec is
			 *         omitted, return the layout specification for given style.
			 * 
			 *         layoutspec is expected to be a list or an object different than
			 *         None that evaluates to False if you want to "turn off" that style.
			 *         If it is a list (or tuple, or something else), each item should be
			 *         a tuple where the first item is the layout name and the second item
			 *         should have the format described below:
			 * 
			 *         LAYOUTS
			 * 
			 *             A layout can contain the value None, if takes no options, or
			 *             a dict of options specifying how to arrange the element.
			 *             The layout mechanism uses a simplified version of the pack
			 *             geometry manager: given an initial cavity, each element is
			 *             allocated a parcel. Valid options/values are:
			 * 
			 *                 side: whichside
			 *                     Specifies which side of the cavity to place the
			 *                     element; one of top, right, bottom or left. If
			 *                     omitted, the element occupies the entire cavity.
			 * 
			 *                 sticky: nswe
			 *                     Specifies where the element is placed inside its
			 *                     allocated parcel.
			 * 
			 *                 children: [sublayout... ]
			 *                     Specifies a list of elements to place inside the
			 *                     element. Each element is a tuple (or other sequence)
			 *                     where the first item is the layout name, and the other
			 *                     is a LAYOUT.
			 */
			layout(style, layoutspec?): Promise<any>
			layout$({ style, layoutspec }: { style, layoutspec?}): Promise<any>

			/**
			 * Create a new element in the current theme of given etype.
			 */
			element_create(elementname, etype): Promise<any>
			element_create$({ elementname, etype }): Promise<any>

			/**
			 * Returns the list of elements defined in the current theme.
			 */
			element_names(): Promise<any>
			element_names$($: {}): Promise<any>

			/**
			 * Return the list of elementname's options.
			 */
			element_options(elementname): Promise<any>
			element_options$({ elementname }): Promise<any>

			/**
			 * Creates a new theme.
			 * 
			 *         It is an error if themename already exists. If parent is
			 *         specified, the new theme will inherit styles, elements and
			 *         layouts from the specified parent theme. If settings are present,
			 *         they are expected to have the same syntax used for theme_settings.
			 */
			theme_create(themename, parent?, settings?): Promise<any>
			theme_create$({ themename, parent, settings }: { themename, parent?, settings?}): Promise<any>

			/**
			 * Temporarily sets the current theme to themename, apply specified
			 *         settings and then restore the previous theme.
			 * 
			 *         Each key in settings is a style and each value may contain the
			 *         keys 'configure', 'map', 'layout' and 'element create' and they
			 *         are expected to have the same format as specified by the methods
			 *         configure, map, layout and element_create respectively.
			 */
			theme_settings(themename, settings): Promise<any>
			theme_settings$({ themename, settings }): Promise<any>

			/**
			 * Returns a list of all known themes.
			 */
			theme_names(): Promise<any>
			theme_names$($: {}): Promise<any>

			/**
			 * If themename is None, returns the theme in use, otherwise, set
			 *         the current theme to themename, refreshes all widgets and emits
			 *         a <<ThemeChanged>> event.
			 */
			theme_use(themename?): Promise<any>
			theme_use$({ themename }: { themename?}): Promise<any>
		}

		/**
		 * Base class for Tk themed widgets.
		 */

		/**
		 * Constructs a Ttk Widget with the parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, takefocus, style
		 * 
		 *         SCROLLABLE WIDGET OPTIONS
		 * 
		 *             xscrollcommand, yscrollcommand
		 * 
		 *         LABEL WIDGET OPTIONS
		 * 
		 *             text, textvariable, underline, image, compound, width
		 * 
		 *         WIDGET STATES
		 * 
		 *             active, disabled, focus, pressed, selected, background,
		 *             readonly, alternate, invalid
		 *         
		 */
		function Widget(master, widgetname, kw?): Promise<IWidget>
		function Widget$({ master, widgetname, kw }: { master, widgetname, kw?}): Promise<IWidget>
		interface IWidget {

			/**
			 * Returns the name of the element at position x, y, or the empty
			 *         string if the point does not lie within any element.
			 * 
			 *         x and y are pixel coordinates relative to the widget.
			 */
			identify(x, y): Promise<any>
			identify$({ x, y }): Promise<any>

			/**
			 * Test the widget's state.
			 * 
			 *         If callback is not specified, returns True if the widget state
			 *         matches statespec and False otherwise. If callback is specified,
			 *         then it will be invoked with *args, **kw if the widget state
			 *         matches statespec. statespec is expected to be a sequence.
			 */
			instate(statespec, callback?): Promise<any>
			instate$({ statespec, callback }: { statespec, callback?}): Promise<any>

			/**
			 * Modify or inquire widget state.
			 * 
			 *         Widget state is returned if statespec is None, otherwise it is
			 *         set according to the statespec flags and then a new state spec
			 *         is returned indicating which flags were changed. statespec is
			 *         expected to be a sequence.
			 */
			state(statespec?): Promise<any>
			state$({ statespec }: { statespec?}): Promise<any>
		}

		/**
		 * Ttk Button widget, displays a textual label and/or image, and
		 *     evaluates a command when pressed.
		 */

		/**
		 * Construct a Ttk Button widget with the parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, compound, cursor, image, state, style, takefocus,
		 *             text, textvariable, underline, width
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             command, default, width
		 *         
		 */
		function Button(master?): Promise<IButton>
		function Button$({ master }: { master?}): Promise<IButton>
		interface IButton extends IWidget {

			/**
			 * Invokes the command associated with the button.
			 */
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
		}

		/**
		 * Ttk Checkbutton widget which is either in on- or off-state.
		 */

		/**
		 * Construct a Ttk Checkbutton widget with the parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, compound, cursor, image, state, style, takefocus,
		 *             text, textvariable, underline, width
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             command, offvalue, onvalue, variable
		 *         
		 */
		function Checkbutton(master?): Promise<ICheckbutton>
		function Checkbutton$({ master }: { master?}): Promise<ICheckbutton>
		interface ICheckbutton extends IWidget {

			/**
			 * Toggles between the selected and deselected states and
			 *         invokes the associated command. If the widget is currently
			 *         selected, sets the option variable to the offvalue option
			 *         and deselects the widget; otherwise, sets the option variable
			 *         to the option onvalue.
			 * 
			 *         Returns the result of the associated command.
			 */
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
		}

		/**
		 * Ttk Entry widget displays a one-line text string and allows that
		 *     string to be edited by the user.
		 */

		/**
		 * Constructs a Ttk Entry widget with the parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus, xscrollcommand
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             exportselection, invalidcommand, justify, show, state,
		 *             textvariable, validate, validatecommand, width
		 * 
		 *         VALIDATION MODES
		 * 
		 *             none, key, focus, focusin, focusout, all
		 *         
		 */
		function Entry(master?, widget?): Promise<IEntry>
		function Entry$({ master, widget }: { master?, widget?}): Promise<IEntry>
		interface IEntry extends IWidget {

			/**
			 * Return a tuple of (x, y, width, height) which describes the
			 *         bounding box of the character given by index.
			 */
			bbox(index): Promise<any>
			bbox$({ index }): Promise<any>

			/**
			 * Returns the name of the element at position x, y, or the
			 *         empty string if the coordinates are outside the window.
			 */
			identify(x, y): Promise<any>
			identify$({ x, y }): Promise<any>

			/**
			 * Force revalidation, independent of the conditions specified
			 *         by the validate option. Returns False if validation fails, True
			 *         if it succeeds. Sets or clears the invalid state accordingly.
			 */
			validate(): Promise<any>
			validate$($: {}): Promise<any>
		}

		/**
		 * Ttk Combobox widget combines a text field with a pop-down list of
		 *     values.
		 */

		/**
		 * Construct a Ttk Combobox widget with the parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             exportselection, justify, height, postcommand, state,
		 *             textvariable, values, width
		 *         
		 */
		function Combobox(master?): Promise<ICombobox>
		function Combobox$({ master }: { master?}): Promise<ICombobox>
		interface ICombobox extends IEntry {

			/**
			 * If newindex is supplied, sets the combobox value to the
			 *         element at position newindex in the list of values. Otherwise,
			 *         returns the index of the current value in the list of values
			 *         or -1 if the current value does not appear in the list.
			 */
			current(newindex?): Promise<any>
			current$({ newindex }: { newindex?}): Promise<any>

			/**
			 * Sets the value of the combobox to value.
			 */
			set(value): Promise<any>
			set$({ value }): Promise<any>
		}

		/**
		 * Ttk Frame widget is a container, used to group other widgets
		 *     together.
		 */

		/**
		 * Construct a Ttk Frame with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             borderwidth, relief, padding, width, height
		 *         
		 */
		function Frame(master?): Promise<IFrame>
		function Frame$({ master }: { master?}): Promise<IFrame>
		interface IFrame extends IWidget {
		}

		/**
		 * Ttk Label widget displays a textual label and/or image.
		 */

		/**
		 * Construct a Ttk Label with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, compound, cursor, image, style, takefocus, text,
		 *             textvariable, underline, width
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             anchor, background, font, foreground, justify, padding,
		 *             relief, text, wraplength
		 *         
		 */
		function Label(master?): Promise<ILabel>
		function Label$({ master }: { master?}): Promise<ILabel>
		interface ILabel extends IWidget {
		}

		/**
		 * Ttk Labelframe widget is a container used to group other widgets
		 *     together. It has an optional label, which may be a plain text string
		 *     or another widget.
		 */

		/**
		 * Construct a Ttk Labelframe with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 *             labelanchor, text, underline, padding, labelwidget, width,
		 *             height
		 *         
		 */
		function Labelframe(master?): Promise<ILabelframe>
		function Labelframe$({ master }: { master?}): Promise<ILabelframe>
		interface ILabelframe extends IWidget {
		}

		/**
		 * Ttk Menubutton widget displays a textual label and/or image, and
		 *     displays a menu when pressed.
		 */

		/**
		 * Construct a Ttk Menubutton with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, compound, cursor, image, state, style, takefocus,
		 *             text, textvariable, underline, width
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             direction, menu
		 *         
		 */
		function Menubutton(master?): Promise<IMenubutton>
		function Menubutton$({ master }: { master?}): Promise<IMenubutton>
		interface IMenubutton extends IWidget {
		}

		/**
		 * Ttk Notebook widget manages a collection of windows and displays
		 *     a single one at a time. Each child window is associated with a tab,
		 *     which the user may select to change the currently-displayed window.
		 */

		/**
		 * Construct a Ttk Notebook with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             height, padding, width
		 * 
		 *         TAB OPTIONS
		 * 
		 *             state, sticky, padding, text, image, compound, underline
		 * 
		 *         TAB IDENTIFIERS (tab_id)
		 * 
		 *             The tab_id argument found in several methods may take any of
		 *             the following forms:
		 * 
		 *                 * An integer between zero and the number of tabs
		 *                 * The name of a child window
		 *                 * A positional specification of the form "@x,y", which
		 *                   defines the tab
		 *                 * The string "current", which identifies the
		 *                   currently-selected tab
		 *                 * The string "end", which returns the number of tabs (only
		 *                   valid for method index)
		 *         
		 */
		function Notebook(master?): Promise<INotebook>
		function Notebook$({ master }: { master?}): Promise<INotebook>
		interface INotebook extends IWidget {

			/**
			 * Adds a new tab to the notebook.
			 * 
			 *         If window is currently managed by the notebook but hidden, it is
			 *         restored to its previous position.
			 */
			add(child): Promise<any>
			add$({ child }): Promise<any>

			/**
			 * Removes the tab specified by tab_id, unmaps and unmanages the
			 *         associated window.
			 */
			forget(tab_id): Promise<any>
			forget$({ tab_id }): Promise<any>

			/**
			 * Hides the tab specified by tab_id.
			 * 
			 *         The tab will not be displayed, but the associated window remains
			 *         managed by the notebook and its configuration remembered. Hidden
			 *         tabs may be restored with the add command.
			 */
			hide(tab_id): Promise<any>
			hide$({ tab_id }): Promise<any>

			/**
			 * Returns the name of the tab element at position x, y, or the
			 *         empty string if none.
			 */
			identify(x, y): Promise<any>
			identify$({ x, y }): Promise<any>

			/**
			 * Returns the numeric index of the tab specified by tab_id, or
			 *         the total number of tabs if tab_id is the string "end".
			 */
			index(tab_id): Promise<any>
			index$({ tab_id }): Promise<any>

			/**
			 * Inserts a pane at the specified position.
			 * 
			 *         pos is either the string end, an integer index, or the name of
			 *         a managed child. If child is already managed by the notebook,
			 *         moves it to the specified position.
			 */
			insert(pos, child): Promise<any>
			insert$({ pos, child }): Promise<any>

			/**
			 * Selects the specified tab.
			 * 
			 *         The associated child window will be displayed, and the
			 *         previously-selected window (if different) is unmapped. If tab_id
			 *         is omitted, returns the widget name of the currently selected
			 *         pane.
			 */
			select(tab_id?): Promise<any>
			select$({ tab_id }: { tab_id?}): Promise<any>

			/**
			 * Query or modify the options of the specific tab_id.
			 * 
			 *         If kw is not given, returns a dict of the tab option values. If option
			 *         is specified, returns the value of that option. Otherwise, sets the
			 *         options to the corresponding values.
			 */
			tab(tab_id, option?): Promise<any>
			tab$({ tab_id, option }: { tab_id, option?}): Promise<any>

			/**
			 * Returns a list of windows managed by the notebook.
			 */
			tabs(): Promise<any>
			tabs$($: {}): Promise<any>

			/**
			 * Enable keyboard traversal for a toplevel window containing
			 *         this notebook.
			 * 
			 *         This will extend the bindings for the toplevel window containing
			 *         this notebook as follows:
			 * 
			 *             Control-Tab: selects the tab following the currently selected
			 *                          one
			 * 
			 *             Shift-Control-Tab: selects the tab preceding the currently
			 *                                selected one
			 * 
			 *             Alt-K: where K is the mnemonic (underlined) character of any
			 *                    tab, will select that tab.
			 * 
			 *         Multiple notebooks in a single toplevel may be enabled for
			 *         traversal, including nested notebooks. However, notebook traversal
			 *         only works properly if all panes are direct children of the
			 *         notebook.
			 */
			enable_traversal(): Promise<any>
			enable_traversal$($: {}): Promise<any>
		}

		/**
		 * Ttk Panedwindow widget displays a number of subwindows, stacked
		 *     either vertically or horizontally.
		 */

		/**
		 * Construct a Ttk Panedwindow with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             orient, width, height
		 * 
		 *         PANE OPTIONS
		 * 
		 *             weight
		 *         
		 */
		function Panedwindow(master?): Promise<IPanedwindow>
		function Panedwindow$({ master }: { master?}): Promise<IPanedwindow>
		interface IPanedwindow extends IWidget {

			/**
			 * Inserts a pane at the specified positions.
			 * 
			 *         pos is either the string end, and integer index, or the name
			 *         of a child. If child is already managed by the paned window,
			 *         moves it to the specified position.
			 */
			insert(pos, child): Promise<any>
			insert$({ pos, child }): Promise<any>

			/**
			 * Query or modify the options of the specified pane.
			 * 
			 *         pane is either an integer index or the name of a managed subwindow.
			 *         If kw is not given, returns a dict of the pane option values. If
			 *         option is specified then the value for that option is returned.
			 *         Otherwise, sets the options to the corresponding values.
			 */
			pane(pane, option?): Promise<any>
			pane$({ pane, option }: { pane, option?}): Promise<any>

			/**
			 * If newpos is specified, sets the position of sash number index.
			 * 
			 *         May adjust the positions of adjacent sashes to ensure that
			 *         positions are monotonically increasing. Sash positions are further
			 *         constrained to be between 0 and the total size of the widget.
			 * 
			 *         Returns the new position of sash number index.
			 */
			sashpos(index, newpos?): Promise<any>
			sashpos$({ index, newpos }: { index, newpos?}): Promise<any>
		}

		/**
		 * Ttk Progressbar widget shows the status of a long-running
		 *     operation. They can operate in two modes: determinate mode shows the
		 *     amount completed relative to the total amount of work to be done, and
		 *     indeterminate mode provides an animated display to let the user know
		 *     that something is happening.
		 */

		/**
		 * Construct a Ttk Progressbar with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             orient, length, mode, maximum, value, variable, phase
		 *         
		 */
		function Progressbar(master?): Promise<IProgressbar>
		function Progressbar$({ master }: { master?}): Promise<IProgressbar>
		interface IProgressbar extends IWidget {

			/**
			 * Begin autoincrement mode: schedules a recurring timer event
			 *         that calls method step every interval milliseconds.
			 * 
			 *         interval defaults to 50 milliseconds (20 steps/second) if omitted.
			 */
			start(interval?): Promise<any>
			start$({ interval }: { interval?}): Promise<any>

			/**
			 * Increments the value option by amount.
			 * 
			 *         amount defaults to 1.0 if omitted.
			 */
			step(amount?): Promise<any>
			step$({ amount }: { amount?}): Promise<any>

			/**
			 * Stop autoincrement mode: cancels any recurring timer event
			 *         initiated by start.
			 */
			stop(): Promise<any>
			stop$($: {}): Promise<any>
		}

		/**
		 * Ttk Radiobutton widgets are used in groups to show or change a
		 *     set of mutually-exclusive options.
		 */

		/**
		 * Construct a Ttk Radiobutton with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, compound, cursor, image, state, style, takefocus,
		 *             text, textvariable, underline, width
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             command, value, variable
		 *         
		 */
		function Radiobutton(master?): Promise<IRadiobutton>
		function Radiobutton$({ master }: { master?}): Promise<IRadiobutton>
		interface IRadiobutton extends IWidget {

			/**
			 * Sets the option variable to the option value, selects the
			 *         widget, and invokes the associated command.
			 * 
			 *         Returns the result of the command, or an empty string if
			 *         no command is specified.
			 */
			invoke(): Promise<any>
			invoke$($: {}): Promise<any>
		}

		/**
		 * Ttk Scale widget is typically used to control the numeric value of
		 *     a linked variable that varies uniformly over some range.
		 */

		/**
		 * Construct a Ttk Scale with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             command, from, length, orient, to, value, variable
		 *         
		 */
		function Scale(master?): Promise<IScale>
		function Scale$({ master }: { master?}): Promise<IScale>
		interface IScale extends IWidget {

			/**
			 * Modify or query scale options.
			 * 
			 *         Setting a value for any of the "from", "from_" or "to" options
			 *         generates a <<RangeChanged>> event.
			 */
			configure(cnf?): Promise<any>
			configure$({ cnf }: { cnf?}): Promise<any>

			/**
			 * Get the current value of the value option, or the value
			 *         corresponding to the coordinates x, y if they are specified.
			 * 
			 *         x and y are pixel coordinates relative to the scale widget
			 *         origin.
			 */
			get(x?, y?): Promise<any>
			get$({ x, y }: { x?, y?}): Promise<any>
		}

		/**
		 * Ttk Scrollbar controls the viewport of a scrollable widget.
		 */

		/**
		 * Construct a Ttk Scrollbar with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             command, orient
		 *         
		 */
		function Scrollbar(master?): Promise<IScrollbar>
		function Scrollbar$({ master }: { master?}): Promise<IScrollbar>
		interface IScrollbar extends IWidget {
		}

		/**
		 * Ttk Separator widget displays a horizontal or vertical separator
		 *     bar.
		 */

		/**
		 * Construct a Ttk Separator with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             orient
		 *         
		 */
		function Separator(master?): Promise<ISeparator>
		function Separator$({ master }: { master?}): Promise<ISeparator>
		interface ISeparator extends IWidget {
		}

		/**
		 * Ttk Sizegrip allows the user to resize the containing toplevel
		 *     window by pressing and dragging the grip.
		 */

		/**
		 * Construct a Ttk Sizegrip with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, state, style, takefocus
		 *         
		 */
		function Sizegrip(master?): Promise<ISizegrip>
		function Sizegrip$({ master }: { master?}): Promise<ISizegrip>
		interface ISizegrip extends IWidget {
		}

		/**
		 * Ttk Spinbox is an Entry with increment and decrement arrows
		 * 
		 *     It is commonly used for number entry or to select from a list of
		 *     string values.
		 *     
		 */

		/**
		 * Construct a Ttk Spinbox widget with the parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus, validate,
		 *             validatecommand, xscrollcommand, invalidcommand
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             to, from_, increment, values, wrap, format, command
		 *         
		 */
		function Spinbox(master?): Promise<ISpinbox>
		function Spinbox$({ master }: { master?}): Promise<ISpinbox>
		interface ISpinbox extends IEntry {

			/**
			 * Sets the value of the Spinbox to value.
			 */
			set(value): Promise<any>
			set$({ value }): Promise<any>
		}

		/**
		 * Ttk Treeview widget displays a hierarchical collection of items.
		 * 
		 *     Each item has a textual label, an optional image, and an optional list
		 *     of data values. The data values are displayed in successive columns
		 *     after the tree label.
		 */

		/**
		 * Construct a Ttk Treeview with parent master.
		 * 
		 *         STANDARD OPTIONS
		 * 
		 *             class, cursor, style, takefocus, xscrollcommand,
		 *             yscrollcommand
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             columns, displaycolumns, height, padding, selectmode, show
		 * 
		 *         ITEM OPTIONS
		 * 
		 *             text, image, values, open, tags
		 * 
		 *         TAG OPTIONS
		 * 
		 *             foreground, background, font, image
		 *         
		 */
		function Treeview(master?): Promise<ITreeview>
		function Treeview$({ master }: { master?}): Promise<ITreeview>
		interface ITreeview extends IWidget {

			/**
			 * Returns the bounding box (relative to the treeview widget's
			 *         window) of the specified item in the form x y width height.
			 * 
			 *         If column is specified, returns the bounding box of that cell.
			 *         If the item is not visible (i.e., if it is a descendant of a
			 *         closed item or is scrolled offscreen), returns an empty string.
			 */
			bbox(item, column?): Promise<any>
			bbox$({ item, column }: { item, column?}): Promise<any>

			/**
			 * Returns a tuple of children belonging to item.
			 * 
			 *         If item is not specified, returns root children.
			 */
			get_children(item?): Promise<any>
			get_children$({ item }: { item?}): Promise<any>

			/**
			 * Replaces item's child with newchildren.
			 * 
			 *         Children present in item that are not present in newchildren
			 *         are detached from tree. No items in newchildren may be an
			 *         ancestor of item.
			 */
			set_children(item): Promise<any>
			set_children$({ item }): Promise<any>

			/**
			 * Query or modify the options for the specified column.
			 * 
			 *         If kw is not given, returns a dict of the column option values. If
			 *         option is specified then the value for that option is returned.
			 *         Otherwise, sets the options to the corresponding values.
			 */
			column(column, option?): Promise<any>
			column$({ column, option }: { column, option?}): Promise<any>

			/**
			 * Delete all specified items and all their descendants. The root
			 *         item may not be deleted.
			 */
			delete(): Promise<any>
			delete$($: {}): Promise<any>

			/**
			 * Unlinks all of the specified items from the tree.
			 * 
			 *         The items and all of their descendants are still present, and may
			 *         be reinserted at another point in the tree, but will not be
			 *         displayed. The root item may not be detached.
			 */
			detach(): Promise<any>
			detach$($: {}): Promise<any>

			/**
			 * Returns True if the specified item is present in the tree,
			 *         False otherwise.
			 */
			exists(item): Promise<any>
			exists$({ item }): Promise<any>

			/**
			 * If item is specified, sets the focus item to item. Otherwise,
			 *         returns the current focus item, or '' if there is none.
			 */
			focus(item?): Promise<any>
			focus$({ item }: { item?}): Promise<any>

			/**
			 * Query or modify the heading options for the specified column.
			 * 
			 *         If kw is not given, returns a dict of the heading option values. If
			 *         option is specified then the value for that option is returned.
			 *         Otherwise, sets the options to the corresponding values.
			 * 
			 *         Valid options/values are:
			 *             text: text
			 *                 The text to display in the column heading
			 *             image: image_name
			 *                 Specifies an image to display to the right of the column
			 *                 heading
			 *             anchor: anchor
			 *                 Specifies how the heading text should be aligned. One of
			 *                 the standard Tk anchor values
			 *             command: callback
			 *                 A callback to be invoked when the heading label is
			 *                 pressed.
			 * 
			 *         To configure the tree column heading, call this with column = "#0" 
			 */
			heading(column, option?): Promise<any>
			heading$({ column, option }: { column, option?}): Promise<any>

			/**
			 * Returns a description of the specified component under the
			 *         point given by x and y, or the empty string if no such component
			 *         is present at that position.
			 */
			identify(component, x, y): Promise<any>
			identify$({ component, x, y }): Promise<any>

			/**
			 * Returns the item ID of the item at position y.
			 */
			identify_row(y): Promise<any>
			identify_row$({ y }): Promise<any>

			/**
			 * Returns the data column identifier of the cell at position x.
			 * 
			 *         The tree column has ID #0.
			 */
			identify_column(x): Promise<any>
			identify_column$({ x }): Promise<any>

			/**
			 * Returns one of:
			 * 
			 *         heading: Tree heading area.
			 *         separator: Space between two columns headings;
			 *         tree: The tree area.
			 *         cell: A data cell.
			 * 
			 *         * Availability: Tk 8.6
			 */
			identify_region(x, y): Promise<any>
			identify_region$({ x, y }): Promise<any>

			/**
			 * Returns the element at position x, y.
			 * 
			 *         * Availability: Tk 8.6
			 */
			identify_element(x, y): Promise<any>
			identify_element$({ x, y }): Promise<any>

			/**
			 * Returns the integer index of item within its parent's list
			 *         of children.
			 */
			index(item): Promise<any>
			index$({ item }): Promise<any>

			/**
			 * Creates a new item and return the item identifier of the newly
			 *         created item.
			 * 
			 *         parent is the item ID of the parent item, or the empty string
			 *         to create a new top-level item. index is an integer, or the value
			 *         end, specifying where in the list of parent's children to insert
			 *         the new item. If index is less than or equal to zero, the new node
			 *         is inserted at the beginning, if index is greater than or equal to
			 *         the current number of children, it is inserted at the end. If iid
			 *         is specified, it is used as the item identifier, iid must not
			 *         already exist in the tree. Otherwise, a new unique identifier
			 *         is generated.
			 */
			insert(parent, index, iid?): Promise<any>
			insert$({ parent, index, iid }: { parent, index, iid?}): Promise<any>

			/**
			 * Query or modify the options for the specified item.
			 * 
			 *         If no options are given, a dict with options/values for the item
			 *         is returned. If option is specified then the value for that option
			 *         is returned. Otherwise, sets the options to the corresponding
			 *         values as given by kw.
			 */
			item(item, option?): Promise<any>
			item$({ item, option }: { item, option?}): Promise<any>

			/**
			 * Moves item to position index in parent's list of children.
			 * 
			 *         It is illegal to move an item under one of its descendants. If
			 *         index is less than or equal to zero, item is moved to the
			 *         beginning, if greater than or equal to the number of children,
			 *         it is moved to the end. If item was detached it is reattached.
			 */
			move(item, parent, index): Promise<any>
			move$({ item, parent, index }): Promise<any>

			/**
			 * Returns the identifier of item's next sibling, or '' if item
			 *         is the last child of its parent.
			 */
			next(item): Promise<any>
			next$({ item }): Promise<any>

			/**
			 * Returns the ID of the parent of item, or '' if item is at the
			 *         top level of the hierarchy.
			 */
			parent(item): Promise<any>
			parent$({ item }): Promise<any>

			/**
			 * Returns the identifier of item's previous sibling, or '' if
			 *         item is the first child of its parent.
			 */
			prev(item): Promise<any>
			prev$({ item }): Promise<any>

			/**
			 * Ensure that item is visible.
			 * 
			 *         Sets all of item's ancestors open option to True, and scrolls
			 *         the widget if necessary so that item is within the visible
			 *         portion of the tree.
			 */
			see(item): Promise<any>
			see$({ item }): Promise<any>

			/**
			 * Returns the tuple of selected items.
			 */
			selection(): Promise<any>
			selection$($: {}): Promise<any>

			/**
			 * The specified items becomes the new selection.
			 */
			selection_set(): Promise<any>
			selection_set$($: {}): Promise<any>

			/**
			 * Add all of the specified items to the selection.
			 */
			selection_add(): Promise<any>
			selection_add$($: {}): Promise<any>

			/**
			 * Remove all of the specified items from the selection.
			 */
			selection_remove(): Promise<any>
			selection_remove$($: {}): Promise<any>

			/**
			 * Toggle the selection state of each specified item.
			 */
			selection_toggle(): Promise<any>
			selection_toggle$($: {}): Promise<any>

			/**
			 * Query or set the value of given item.
			 * 
			 *         With one argument, return a dictionary of column/value pairs
			 *         for the specified item. With two arguments, return the current
			 *         value of the specified column. With three arguments, set the
			 *         value of given column in given item to the specified value.
			 */
			set(item, column?, value?): Promise<any>
			set$({ item, column, value }: { item, column?, value?}): Promise<any>

			/**
			 * Bind a callback for the given event sequence to the tag tagname.
			 *         When an event is delivered to an item, the callbacks for each
			 *         of the item's tags option are called.
			 */
			tag_bind(tagname, sequence?, callback?): Promise<any>
			tag_bind$({ tagname, sequence, callback }: { tagname, sequence?, callback?}): Promise<any>

			/**
			 * Query or modify the options for the specified tagname.
			 * 
			 *         If kw is not given, returns a dict of the option settings for tagname.
			 *         If option is specified, returns the value for that option for the
			 *         specified tagname. Otherwise, sets the options to the corresponding
			 *         values for the given tagname.
			 */
			tag_configure(tagname, option?): Promise<any>
			tag_configure$({ tagname, option }: { tagname, option?}): Promise<any>

			/**
			 * If item is specified, returns 1 or 0 depending on whether the
			 *         specified item has the given tagname. Otherwise, returns a list of
			 *         all items which have the specified tag.
			 * 
			 *         * Availability: Tk 8.6
			 */
			tag_has(tagname, item?): Promise<any>
			tag_has$({ tagname, item }: { tagname, item?}): Promise<any>
			reattach
		}

		/**
		 * A Ttk Scale widget with a Ttk Label widget indicating its
		 *     current value.
		 * 
		 *     The Ttk Scale can be accessed through instance.scale, and Ttk Label
		 *     can be accessed through instance.label
		 */

		/**
		 * Construct a horizontal LabeledScale with parent master, a
		 *         variable to be associated with the Ttk Scale widget and its range.
		 *         If variable is not specified, a tkinter.IntVar is created.
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             compound: 'top' or 'bottom'
		 *                 Specifies how to display the label relative to the scale.
		 *                 Defaults to 'top'.
		 *         
		 */
		function LabeledScale(master?, variable?, from_?, to?): Promise<ILabeledScale>
		function LabeledScale$({ master, variable, from_, to }: { master?, variable?, from_?, to?}): Promise<ILabeledScale>
		interface ILabeledScale extends IFrame {

			/**
			 * Destroy this widget and possibly its associated variable.
			 */
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>

			/**
			 * Return current scale value.
			 */
			value(): Promise<any>
			value$($: {}): Promise<any>

			/**
			 * Set new scale value.
			 */
			value(val): Promise<any>
			value$({ val }): Promise<any>
		}

		/**
		 * Themed OptionMenu, based after tkinter's OptionMenu, which allows
		 *     the user to select a value from a menu.
		 */

		/**
		 * Construct a themed OptionMenu widget with master as the parent,
		 *         the resource textvariable set to variable, the initially selected
		 *         value specified by the default parameter, the menu values given by
		 *         *values and additional keywords.
		 * 
		 *         WIDGET-SPECIFIC OPTIONS
		 * 
		 *             style: stylename
		 *                 Menubutton style.
		 *             direction: 'above', 'below', 'left', 'right', or 'flush'
		 *                 Menubutton direction.
		 *             command: callback
		 *                 A callback that will be invoked after selecting an item.
		 *         
		 */
		function OptionMenu(master, variable, def?): Promise<IOptionMenu>
		function OptionMenu$({ master, variable, def }: { master, variable, def?}): Promise<IOptionMenu>
		interface IOptionMenu extends IMenubutton {

			/**
			 * Build a new menu of radiobuttons with *values and optionally
			 *         a default value.
			 */
			set_menu(def?): Promise<any>
			set_menu$({ def }: { def?}): Promise<any>

			/**
			 * Destroy this widget and its associated variable.
			 */
			destroy(): Promise<any>
			destroy$($: {}): Promise<any>
		}
		let LabelFrame: Promise<any>
		let PanedWindow: Promise<any>
	}
}
declare module turtledemo {
	module chaos {
		var _
		function f(x): Promise<any>
		function f$({ x }): Promise<any>
		function g(x): Promise<any>
		function g$({ x }): Promise<any>
		function h(x): Promise<any>
		function h$({ x }): Promise<any>
		function jumpto(x, y): Promise<any>
		function jumpto$({ x, y }): Promise<any>
		function line(x1, y1, x2, y2): Promise<any>
		function line$({ x1, y1, x2, y2 }): Promise<any>
		function coosys(): Promise<any>
		function coosys$($: {}): Promise<any>
		function plot(fun, start, color): Promise<any>
		function plot$({ fun, start, color }): Promise<any>
		function main(): Promise<any>
		function main$($: {}): Promise<any>
		let N: Promise<any>
	}
}
declare module uuid {
	var _

	/**
	 * Get the hardware address as a 48-bit positive integer.
	 * 
	 *     The first time this runs, it may launch a separate program, which could
	 *     be quite slow.  If all attempts to obtain the hardware address fail, we
	 *     choose a random 48-bit number with its eighth bit set to 1 as recommended
	 *     in RFC 4122.
	 *     
	 */
	function getnode(): Promise<any>
	function getnode$($: {}): Promise<any>

	/**
	 * Generate a UUID from a host ID, sequence number, and the current time.
	 *     If 'node' is not given, getnode() is used to obtain the hardware
	 *     address.  If 'clock_seq' is given, it is used as the sequence number;
	 *     otherwise a random 14-bit sequence number is chosen.
	 */
	function uuid1(node?, clock_seq?): Promise<any>
	function uuid1$({ node, clock_seq }: { node?, clock_seq?}): Promise<any>

	/**
	 * Generate a UUID from the MD5 hash of a namespace UUID and a name.
	 */
	function uuid3(namespace, name): Promise<any>
	function uuid3$({ namespace, name }): Promise<any>

	/**
	 * Generate a random UUID.
	 */
	function uuid4(): Promise<any>
	function uuid4$($: {}): Promise<any>

	/**
	 * Generate a UUID from the SHA-1 hash of a namespace UUID and a name.
	 */
	function uuid5(namespace, name): Promise<any>
	function uuid5$({ namespace, name }): Promise<any>
	interface ISafeUUID {
		safe
		unsafe
		unknown
	}

	/**
	 * Instances of the UUID class represent UUIDs as specified in RFC 4122.
	 *     UUID objects are immutable, hashable, and usable as dictionary keys.
	 *     Converting a UUID to a string with str() yields something in the form
	 *     '12345678-1234-1234-1234-123456789abc'.  The UUID constructor accepts
	 *     five possible forms: a similar string of hexadecimal digits, or a tuple
	 *     of six integer fields (with 32-bit, 16-bit, 16-bit, 8-bit, 8-bit, and
	 *     48-bit values respectively) as an argument named 'fields', or a string
	 *     of 16 bytes (with all the integer fields in big-endian order) as an
	 *     argument named 'bytes', or a string of 16 bytes (with the first three
	 *     fields in little-endian order) as an argument named 'bytes_le', or a
	 *     single 128-bit integer as an argument named 'int'.
	 * 
	 *     UUIDs have these read-only attributes:
	 * 
	 *         bytes       the UUID as a 16-byte string (containing the six
	 *                     integer fields in big-endian byte order)
	 * 
	 *         bytes_le    the UUID as a 16-byte string (with time_low, time_mid,
	 *                     and time_hi_version in little-endian byte order)
	 * 
	 *         fields      a tuple of the six integer fields of the UUID,
	 *                     which are also available as six individual attributes
	 *                     and two derived attributes:
	 * 
	 *             time_low                the first 32 bits of the UUID
	 *             time_mid                the next 16 bits of the UUID
	 *             time_hi_version         the next 16 bits of the UUID
	 *             clock_seq_hi_variant    the next 8 bits of the UUID
	 *             clock_seq_low           the next 8 bits of the UUID
	 *             node                    the last 48 bits of the UUID
	 * 
	 *             time                    the 60-bit timestamp
	 *             clock_seq               the 14-bit sequence number
	 * 
	 *         hex         the UUID as a 32-character hexadecimal string
	 * 
	 *         int         the UUID as a 128-bit integer
	 * 
	 *         urn         the UUID as a URN as specified in RFC 4122
	 * 
	 *         variant     the UUID variant (one of the constants RESERVED_NCS,
	 *                     RFC_4122, RESERVED_MICROSOFT, or RESERVED_FUTURE)
	 * 
	 *         version     the UUID version number (1 through 5, meaningful only
	 *                     when the variant is RFC_4122)
	 * 
	 *         is_safe     An enum indicating whether the UUID has been generated in
	 *                     a way that is safe for multiprocessing applications, via
	 *                     uuid_generate_time_safe(3).
	 *     
	 */

	/**
	 * Create a UUID from either a string of 32 hexadecimal digits,
	 *         a string of 16 bytes as the 'bytes' argument, a string of 16 bytes
	 *         in little-endian order as the 'bytes_le' argument, a tuple of six
	 *         integers (32-bit time_low, 16-bit time_mid, 16-bit time_hi_version,
	 *         8-bit clock_seq_hi_variant, 8-bit clock_seq_low, 48-bit node) as
	 *         the 'fields' argument, or a single 128-bit integer as the 'int'
	 *         argument.  When a string of hex digits is given, curly braces,
	 *         hyphens, and a URN prefix are all optional.  For example, these
	 *         expressions all yield the same UUID:
	 * 
	 *         UUID('{12345678-1234-5678-1234-567812345678}')
	 *         UUID('12345678123456781234567812345678')
	 *         UUID('urn:uuid:12345678-1234-5678-1234-567812345678')
	 *         UUID(bytes='\x12\x34\x56\x78'*4)
	 *         UUID(bytes_le='\x78\x56\x34\x12\x34\x12\x78\x56' +
	 *                       '\x12\x34\x56\x78\x12\x34\x56\x78')
	 *         UUID(fields=(0x12345678, 0x1234, 0x5678, 0x12, 0x34, 0x567812345678))
	 *         UUID(int=0x12345678123456781234567812345678)
	 * 
	 *         Exactly one of 'hex', 'bytes', 'bytes_le', 'fields', or 'int' must
	 *         be given.  The 'version' argument is optional; if given, the resulting
	 *         UUID will have its variant and version set according to RFC 4122,
	 *         overriding the given 'hex', 'bytes', 'bytes_le', 'fields', or 'int'.
	 * 
	 *         is_safe is an enum exposed as an attribute on the instance.  It
	 *         indicates whether the UUID has been generated in a way that is safe
	 *         for multiprocessing applications, via uuid_generate_time_safe(3).
	 *         
	 */
	function UUID(hex?, bytes?, bytes_le?, fields?, int?, version?): Promise<IUUID>
	function UUID$({ hex, bytes, bytes_le, fields, int, version }: { hex?, bytes?, bytes_le?, fields?, int?, version?}): Promise<IUUID>
	interface IUUID {
		bytes(): Promise<any>
		bytes$($: {}): Promise<any>
		bytes_le(): Promise<any>
		bytes_le$($: {}): Promise<any>
		fields(): Promise<any>
		fields$($: {}): Promise<any>
		time_low(): Promise<any>
		time_low$($: {}): Promise<any>
		time_mid(): Promise<any>
		time_mid$($: {}): Promise<any>
		time_hi_version(): Promise<any>
		time_hi_version$($: {}): Promise<any>
		clock_seq_hi_variant(): Promise<any>
		clock_seq_hi_variant$($: {}): Promise<any>
		clock_seq_low(): Promise<any>
		clock_seq_low$($: {}): Promise<any>
		time(): Promise<any>
		time$($: {}): Promise<any>
		clock_seq(): Promise<any>
		clock_seq$($: {}): Promise<any>
		node(): Promise<any>
		node$($: {}): Promise<any>
		hex(): Promise<any>
		hex$($: {}): Promise<any>
		urn(): Promise<any>
		urn$($: {}): Promise<any>
		variant(): Promise<any>
		variant$($: {}): Promise<any>
		version(): Promise<any>
		version$($: {}): Promise<any>
	}
	let int_: Promise<any>
	let bytes_: Promise<any>
	let NAMESPACE_DNS: Promise<any>
	let NAMESPACE_URL: Promise<any>
	let NAMESPACE_OID: Promise<any>
	let NAMESPACE_X500: Promise<any>
}
declare module zipfile {
	var _

	/**
	 * Quickly see if a file is a ZIP file by checking the magic number.
	 * 
	 *     The filename argument may be a file or file-like object too.
	 *     
	 */
	function is_zipfile(filename): Promise<any>
	function is_zipfile$({ filename }): Promise<any>
	function main(args?): Promise<any>
	function main$({ args }: { args?}): Promise<any>
	interface IBadZipFile {
	}

	/**
	 * 
	 *     Raised when writing a zipfile, the zipfile requires ZIP64 extensions
	 *     and those extensions are disabled.
	 *     
	 */
	interface ILargeZipFile {
	}

	/**
	 * Class with attributes describing each file in the ZIP archive.
	 */
	function ZipInfo(filename?, date_time?): Promise<IZipInfo>
	function ZipInfo$({ filename, date_time }: { filename?, date_time?}): Promise<IZipInfo>
	interface IZipInfo {

		/**
		 * Return the per-file header as a bytes object.
		 */
		FileHeader(zip64?): Promise<any>
		FileHeader$({ zip64 }: { zip64?}): Promise<any>

		/**
		 * Construct an appropriate ZipInfo for a file on the filesystem.
		 * 
		 *         filename should be the path to a file or directory on the filesystem.
		 * 
		 *         arcname is the name which it will have within the archive (by default,
		 *         this will be the same as filename, but without a drive letter and with
		 *         leading path separators removed).
		 *         
		 */
		from_file(filename, arcname?): Promise<any>
		from_file$({ filename, arcname }: { filename, arcname?}): Promise<any>

		/**
		 * Return True if this archive member is a directory.
		 */
		is_dir(): Promise<any>
		is_dir$($: {}): Promise<any>
	}
	function LZMACompressor(): Promise<ILZMACompressor>
	function LZMACompressor$({ }): Promise<ILZMACompressor>
	interface ILZMACompressor {
		compress(data): Promise<any>
		compress$({ data }): Promise<any>
		flush(): Promise<any>
		flush$($: {}): Promise<any>
	}
	function LZMADecompressor(): Promise<ILZMADecompressor>
	function LZMADecompressor$({ }): Promise<ILZMADecompressor>
	interface ILZMADecompressor {
		decompress(data): Promise<any>
		decompress$({ data }): Promise<any>
	}
	interface I_SharedFile {
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
		read(n?): Promise<any>
		read$({ n }: { n?}): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
	}
	interface I_Tellable {
		write(data): Promise<any>
		write$({ data }): Promise<any>
		tell(): Promise<any>
		tell$($: {}): Promise<any>
		flush(): Promise<any>
		flush$($: {}): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
	}

	/**
	 * File-like object for reading an archive member.
	 *        Is returned by ZipFile.open().
	 *     
	 */
	function ZipExtFile(fileobj, mode, zipinfo, pwd?, close_fileobj?: boolean): Promise<IZipExtFile>
	function ZipExtFile$({ fileobj, mode, zipinfo, pwd, close_fileobj }: { fileobj, mode, zipinfo, pwd?, close_fileobj?}): Promise<IZipExtFile>
	interface IZipExtFile {

		/**
		 * Read and return a line from the stream.
		 * 
		 *         If limit is specified, at most limit bytes will be read.
		 *         
		 */
		readline(limit?): Promise<any>
		readline$({ limit }: { limit?}): Promise<any>

		/**
		 * Returns buffered bytes without advancing the position.
		 */
		peek(n?): Promise<any>
		peek$({ n }: { n?}): Promise<any>
		readable(): Promise<any>
		readable$($: {}): Promise<any>

		/**
		 * Read and return up to n bytes.
		 *         If the argument is omitted, None, or negative, data is read and returned until EOF is reached.
		 *         
		 */
		read(n?): Promise<any>
		read$({ n }: { n?}): Promise<any>

		/**
		 * Read up to n bytes with at most one read() system call.
		 */
		read1(n): Promise<any>
		read1$({ n }): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
		seekable(): Promise<any>
		seekable$($: {}): Promise<any>
		seek(offset, whence?): Promise<any>
		seek$({ offset, whence }: { offset, whence?}): Promise<any>
		tell(): Promise<any>
		tell$($: {}): Promise<any>
		MAX_N
		MIN_READ_SIZE
		MAX_SEEK_READ
	}
	interface I_ZipWriteFile {
		writable(): Promise<any>
		writable$($: {}): Promise<any>
		write(data): Promise<any>
		write$({ data }): Promise<any>
		close(): Promise<any>
		close$($: {}): Promise<any>
	}

	/**
	 *  Class with methods to open, read, write, close, list zip files.
	 * 
	 *     z = ZipFile(file, mode="r", compression=ZIP_STORED, allowZip64=True,
	 *                 compresslevel=None)
	 * 
	 *     file: Either the path to the file, or a file-like object.
	 *           If it is a path, the file will be opened and closed by ZipFile.
	 *     mode: The mode can be either read 'r', write 'w', exclusive create 'x',
	 *           or append 'a'.
	 *     compression: ZIP_STORED (no compression), ZIP_DEFLATED (requires zlib),
	 *                  ZIP_BZIP2 (requires bz2) or ZIP_LZMA (requires lzma).
	 *     allowZip64: if True ZipFile will create files with ZIP64 extensions when
	 *                 needed, otherwise it will raise an exception when this would
	 *                 be necessary.
	 *     compresslevel: None (default for the given compression type) or an integer
	 *                    specifying the level to pass to the compressor.
	 *                    When using ZIP_STORED or ZIP_LZMA this keyword has no effect.
	 *                    When using ZIP_DEFLATED integers 0 through 9 are accepted.
	 *                    When using ZIP_BZIP2 integers 1 through 9 are accepted.
	 * 
	 *     
	 */

	/**
	 * Open the ZIP file with mode read 'r', write 'w', exclusive create 'x',
	 *         or append 'a'.
	 */
	function ZipFile(file, mode?, compression?, allowZip64?: boolean, compresslevel?): Promise<IZipFile>
	function ZipFile$({ file, mode, compression, allowZip64, compresslevel }: { file, mode?, compression?, allowZip64?, compresslevel?}): Promise<IZipFile>
	interface IZipFile {

		/**
		 * Return a list of file names in the archive.
		 */
		namelist(): Promise<any>
		namelist$($: {}): Promise<any>

		/**
		 * Return a list of class ZipInfo instances for files in the
		 *         archive.
		 */
		infolist(): Promise<any>
		infolist$($: {}): Promise<any>

		/**
		 * Print a table of contents for the zip file.
		 */
		printdir(file?): Promise<any>
		printdir$({ file }: { file?}): Promise<any>

		/**
		 * Read all the files and check the CRC.
		 */
		testzip(): Promise<any>
		testzip$($: {}): Promise<any>

		/**
		 * Return the instance of ZipInfo given 'name'.
		 */
		getinfo(name): Promise<any>
		getinfo$({ name }): Promise<any>

		/**
		 * Set default password for encrypted files.
		 */
		setpassword(pwd): Promise<any>
		setpassword$({ pwd }): Promise<any>

		/**
		 * The comment text associated with the ZIP file.
		 */
		comment(): Promise<any>
		comment$($: {}): Promise<any>
		comment(comment): Promise<any>
		comment$({ comment }): Promise<any>

		/**
		 * Return file bytes for name.
		 */
		read(name, pwd?): Promise<any>
		read$({ name, pwd }: { name, pwd?}): Promise<any>

		/**
		 * Return file-like object for 'name'.
		 * 
		 *         name is a string for the file name within the ZIP file, or a ZipInfo
		 *         object.
		 * 
		 *         mode should be 'r' to read a file already in the ZIP file, or 'w' to
		 *         write to a file newly added to the archive.
		 * 
		 *         pwd is the password to decrypt files (only used for reading).
		 * 
		 *         When writing, if the file size is not known in advance but may exceed
		 *         2 GiB, pass force_zip64 to use the ZIP64 format, which can handle large
		 *         files.  If the size is known in advance, it is best to pass a ZipInfo
		 *         instance for name, with zinfo.file_size set.
		 *         
		 */
		open(name, mode?, pwd?): Promise<any>
		open$({ name, mode, pwd }: { name, mode?, pwd?}): Promise<any>

		/**
		 * Extract a member from the archive to the current working directory,
		 *            using its full name. Its file information is extracted as accurately
		 *            as possible. `member' may be a filename or a ZipInfo object. You can
		 *            specify a different directory using `path'.
		 *         
		 */
		extract(member, path?, pwd?): Promise<any>
		extract$({ member, path, pwd }: { member, path?, pwd?}): Promise<any>

		/**
		 * Extract all members from the archive to the current working
		 *            directory. `path' specifies a different directory to extract to.
		 *            `members' is optional and must be a subset of the list returned
		 *            by namelist().
		 *         
		 */
		extractall(path?, members?, pwd?): Promise<any>
		extractall$({ path, members, pwd }: { path?, members?, pwd?}): Promise<any>

		/**
		 * Put the bytes from filename into the archive under the name
		 *         arcname.
		 */
		write(filename, arcname?, compress_type?, compresslevel?): Promise<any>
		write$({ filename, arcname, compress_type, compresslevel }: { filename, arcname?, compress_type?, compresslevel?}): Promise<any>

		/**
		 * Write a file into the archive.  The contents is 'data', which
		 *         may be either a 'str' or a 'bytes' instance; if it is a 'str',
		 *         it is encoded as UTF-8 first.
		 *         'zinfo_or_arcname' is either a ZipInfo instance or
		 *         the name of the file in the archive.
		 */
		writestr(zinfo_or_arcname, data, compress_type?, compresslevel?): Promise<any>
		writestr$({ zinfo_or_arcname, data, compress_type, compresslevel }: { zinfo_or_arcname, data, compress_type?, compresslevel?}): Promise<any>

		/**
		 * Close the file, and for mode 'w', 'x' and 'a' write the ending
		 *         records.
		 */
		close(): Promise<any>
		close$($: {}): Promise<any>
		fp
	}

	/**
	 * Class to create ZIP archives with Python library files and packages.
	 */
	function PyZipFile(file, mode?, compression?, allowZip64?: boolean, optimize?): Promise<IPyZipFile>
	function PyZipFile$({ file, mode, compression, allowZip64, optimize }: { file, mode?, compression?, allowZip64?, optimize?}): Promise<IPyZipFile>
	interface IPyZipFile extends IZipFile {

		/**
		 * Add all files from "pathname" to the ZIP archive.
		 * 
		 *         If pathname is a package directory, search the directory and
		 *         all package subdirectories recursively for all *.py and enter
		 *         the modules into the archive.  If pathname is a plain
		 *         directory, listdir *.py and enter all modules.  Else, pathname
		 *         must be a Python *.py file and the module will be put into the
		 *         archive.  Added modules are always module.pyc.
		 *         This method will compile the module.py into module.pyc if
		 *         necessary.
		 *         If filterfunc(pathname) is given, it is called with every argument.
		 *         When it is False, the file or directory is skipped.
		 *         
		 */
		writepy(pathname, basename?, filterfunc?): Promise<any>
		writepy$({ pathname, basename, filterfunc }: { pathname, basename?, filterfunc?}): Promise<any>
	}

	/**
	 * 
	 *     A ZipFile subclass that ensures that implied directories
	 *     are always included in the namelist.
	 *     
	 */
	interface ICompleteDirs extends IZipFile {
		namelist(): Promise<any>
		namelist$($: {}): Promise<any>

		/**
		 * 
		 *         If the name represents a directory, return that name
		 *         as a directory (with the trailing slash).
		 *         
		 */
		resolve_dir(name): Promise<any>
		resolve_dir$({ name }): Promise<any>

		/**
		 * 
		 *         Given a source (filename or zipfile), return an
		 *         appropriate CompleteDirs subclass.
		 *         
		 */
		make(source): Promise<any>
		make$({ source }): Promise<any>
	}

	/**
	 * 
	 *     ZipFile subclass to ensure implicit
	 *     dirs exist and are resolved rapidly.
	 *     
	 */
	interface IFastLookup extends ICompleteDirs {
		namelist(): Promise<any>
		namelist$($: {}): Promise<any>
	}

	/**
	 * 
	 *     A pathlib-compatible interface for zip files.
	 * 
	 *     Consider a zip file with this structure::
	 * 
	 *         .
	 *         ├── a.txt
	 *         └── b
	 *             ├── c.txt
	 *             └── d
	 *                 └── e.txt
	 * 
	 *     >>> data = io.BytesIO()
	 *     >>> zf = ZipFile(data, 'w')
	 *     >>> zf.writestr('a.txt', 'content of a')
	 *     >>> zf.writestr('b/c.txt', 'content of c')
	 *     >>> zf.writestr('b/d/e.txt', 'content of e')
	 *     >>> zf.filename = 'mem/abcde.zip'
	 * 
	 *     Path accepts the zipfile object itself or a filename
	 * 
	 *     >>> root = Path(zf)
	 * 
	 *     From there, several path operations are available.
	 * 
	 *     Directory iteration (including the zip file itself):
	 * 
	 *     >>> a, b = root.iterdir()
	 *     >>> a
	 *     Path('mem/abcde.zip', 'a.txt')
	 *     >>> b
	 *     Path('mem/abcde.zip', 'b/')
	 * 
	 *     name property:
	 * 
	 *     >>> b.name
	 *     'b'
	 * 
	 *     join with divide operator:
	 * 
	 *     >>> c = b / 'c.txt'
	 *     >>> c
	 *     Path('mem/abcde.zip', 'b/c.txt')
	 *     >>> c.name
	 *     'c.txt'
	 * 
	 *     Read text:
	 * 
	 *     >>> c.read_text()
	 *     'content of c'
	 * 
	 *     existence:
	 * 
	 *     >>> c.exists()
	 *     True
	 *     >>> (b / 'missing.txt').exists()
	 *     False
	 * 
	 *     Coercion to string:
	 * 
	 *     >>> import os
	 *     >>> str(c).replace(os.sep, posixpath.sep)
	 *     'mem/abcde.zip/b/c.txt'
	 * 
	 *     At the root, ``name``, ``filename``, and ``parent``
	 *     resolve to the zipfile. Note these attributes are not
	 *     valid and will raise a ``ValueError`` if the zipfile
	 *     has no filename.
	 * 
	 *     >>> root.name
	 *     'abcde.zip'
	 *     >>> str(root.filename).replace(os.sep, posixpath.sep)
	 *     'mem/abcde.zip'
	 *     >>> str(root.parent)
	 *     'mem'
	 *     
	 */

	/**
	 * 
	 *         Construct a Path from a ZipFile or filename.
	 * 
	 *         Note: When the source is an existing ZipFile object,
	 *         its type (__class__) will be mutated to a
	 *         specialized type. If the caller wishes to retain the
	 *         original type, the caller should either create a
	 *         separate ZipFile object or pass a filename.
	 *         
	 */
	function Path(root, at?): Promise<IPath>
	function Path$({ root, at }: { root, at?}): Promise<IPath>
	interface IPath {

		/**
		 * 
		 *         Open this entry as text or binary following the semantics
		 *         of ``pathlib.Path.open()`` by passing arguments through
		 *         to io.TextIOWrapper().
		 *         
		 */
		open(mode?): Promise<any>
		open$({ mode }: { mode?}): Promise<any>
		name(): Promise<any>
		name$($: {}): Promise<any>
		suffix(): Promise<any>
		suffix$($: {}): Promise<any>
		suffixes(): Promise<any>
		suffixes$($: {}): Promise<any>
		stem(): Promise<any>
		stem$($: {}): Promise<any>
		filename(): Promise<any>
		filename$($: {}): Promise<any>
		read_text(): Promise<any>
		read_text$($: {}): Promise<any>
		read_bytes(): Promise<any>
		read_bytes$($: {}): Promise<any>
		is_dir(): Promise<any>
		is_dir$($: {}): Promise<any>
		is_file(): Promise<any>
		is_file$($: {}): Promise<any>
		exists(): Promise<any>
		exists$($: {}): Promise<any>
		iterdir(): Promise<any>
		iterdir$($: {}): Promise<any>
		joinpath(): Promise<any>
		joinpath$($: {}): Promise<any>
		parent(): Promise<any>
		parent$($: {}): Promise<any>
	}
	let crc32: Promise<any>
	let error: Promise<any>
	let BadZipfile: Promise<any>
	let ZIP64_LIMIT: Promise<any>
	let ZIP_FILECOUNT_LIMIT: Promise<any>
	let ZIP_MAX_COMMENT: Promise<any>
	let ZIP_STORED: Promise<any>
	let ZIP_DEFLATED: Promise<any>
	let ZIP_BZIP2: Promise<any>
	let ZIP_LZMA: Promise<any>
	let DEFAULT_VERSION: Promise<any>
	let ZIP64_VERSION: Promise<any>
	let BZIP2_VERSION: Promise<any>
	let LZMA_VERSION: Promise<any>
	let MAX_EXTRACT_VERSION: Promise<any>
	let structEndArchive: Promise<any>
	let stringEndArchive: Promise<any>
	let sizeEndCentDir: Promise<any>
	let structCentralDir: Promise<any>
	let stringCentralDir: Promise<any>
	let sizeCentralDir: Promise<any>
	let structFileHeader: Promise<any>
	let stringFileHeader: Promise<any>
	let sizeFileHeader: Promise<any>
	let structEndArchive64Locator: Promise<any>
	let stringEndArchive64Locator: Promise<any>
	let sizeEndCentDir64Locator: Promise<any>
	let structEndArchive64: Promise<any>
	let stringEndArchive64: Promise<any>
	let sizeEndCentDir64: Promise<any>
	let compressor_names: Promise<any>
}
type PyObjectType<T> =
	T extends "astexport" ? typeof astexport :
	T extends "base64" ? typeof base64 :
	T extends "codecs" ? typeof codecs :
	T extends "colorsys" ? typeof colorsys :
	T extends "crypt" ? typeof crypt :
	T extends "decimal" ? typeof decimal :
	T extends "email.base64mime" ? typeof email.base64mime :
	T extends "encodings.base64_codec" ? typeof encodings.base64_codec :
	T extends "encodings.bz2_codec" ? typeof encodings.bz2_codec :
	T extends "encodings.hex_codec" ? typeof encodings.hex_codec :
	T extends "encodings.palmos" ? typeof encodings.palmos :
	T extends "encodings.quopri_codec" ? typeof encodings.quopri_codec :
	T extends "encodings.uu_codec" ? typeof encodings.uu_codec :
	T extends "encodings.zlib_codec" ? typeof encodings.zlib_codec :
	T extends "export" ? typeof export :
	T extends "gzip" ? typeof gzip :
	T extends "hashlib" ? typeof hashlib :
	T extends "idlelib.codecontext" ? typeof idlelib.codecontext :
	T extends "idlelib.statusbar" ? typeof idlelib.statusbar :
	T extends "os" ? typeof os :
	T extends "platform" ? typeof platform :
	T extends "pstats" ? typeof pstats :
	T extends "signal" ? typeof signal :
	T extends "socket" ? typeof socket :
	T extends "socketserver" ? typeof socketserver :
	T extends "sqlite3.dbapi2" ? typeof sqlite3.dbapi2 :
	T extends "sqlite3.dump" ? typeof sqlite3.dump :
	T extends "stat" ? typeof stat :
	T extends "statistics" ? typeof statistics :
	T extends "tarfile" ? typeof tarfile :
	T extends "threading" ? typeof threading :
	T extends "tkinter.colorchooser" ? typeof tkinter.colorchooser :
	T extends "tkinter.commondialog" ? typeof tkinter.commondialog :
	T extends "tkinter.constants" ? typeof tkinter.constants :
	T extends "tkinter.dialog" ? typeof tkinter.dialog :
	T extends "tkinter.dnd" ? typeof tkinter.dnd :
	T extends "tkinter.filedialog" ? typeof tkinter.filedialog :
	T extends "tkinter.font" ? typeof tkinter.font :
	T extends "tkinter.messagebox" ? typeof tkinter.messagebox :
	T extends "tkinter.scrolledtext" ? typeof tkinter.scrolledtext :
	T extends "tkinter.simpledialog" ? typeof tkinter.simpledialog :
	T extends "tkinter.tix" ? typeof tkinter.tix :
	T extends "tkinter.ttk" ? typeof tkinter.ttk :
	T extends "turtledemo.chaos" ? typeof turtledemo.chaos :
	T extends "uuid" ? typeof uuid :
	T extends "zipfile" ? typeof zipfile :
	T extends "sqlite3" ? typeof sqlite3 :
	T extends "tkinter" ? typeof tkinter : object;
type PyTypeName =
	"astexport" | "base64" | "codecs" | "colorsys" | "crypt" | "decimal" | "email.base64mime" | "encodings.base64_codec" | "encodings.bz2_codec" | "encodings.hex_codec" | "encodings.palmos" | "encodings.quopri_codec" | "encodings.uu_codec" | "encodings.zlib_codec" | "export" | "gzip" | "hashlib" | "idlelib.codecontext" | "idlelib.statusbar" | "os" | "platform" | "pstats" | "signal" | "socket" | "socketserver" | "sqlite3.dbapi2" | "sqlite3.dump" | "stat" | "statistics" | "tarfile" | "threading" | "tkinter.colorchooser" | "tkinter.commondialog" | "tkinter.constants" | "tkinter.dialog" | "tkinter.dnd" | "tkinter.filedialog" | "tkinter.font" | "tkinter.messagebox" | "tkinter.scrolledtext" | "tkinter.simpledialog" | "tkinter.tix" | "tkinter.ttk" | "turtledemo.chaos" | "uuid" | "zipfile" | "sqlite3" | "tkinter";